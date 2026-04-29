import type { Project, Post } from "@/sbComponentType";
import type { GetStaticPropsContext } from "next";
import {
  getStoryblokApi,
  ISbStoryData,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";
import { relations } from "@/config/storyblok";
import { Fragment } from "react";
import { ExitPreview } from "@/libs/ExitPreview";

export type ListsProps = {
  projects?: ISbStoryData<Project>[] | null;
  posts?: ISbStoryData<Post>[] | null;
};

export interface LayoutComponent {
  story: ISbStoryData | null;
  lists: ListsProps;
  draft: boolean
}

export default function Home({ story, lists, draft }: LayoutComponent) {
  const page = useStoryblokState(story, {
    resolveRelations: relations.join(","),
    preventClicks: true,
  });

  if (!page) return null;
  return (
    <Fragment>
      <StoryblokComponent blok={page?.content} lists={lists} />
      <ExitPreview enable={!!draft} slug={page.slug} />
    </Fragment>
  );
}

export const getStaticProps = async ({ draftMode }: GetStaticPropsContext) => {
  const version = process.env.NODE_ENV === "development" ? "draft" : !!draftMode ? "draft" : "published"

  const storyblokApi = getStoryblokApi();
  let story
  try {
    const home = await storyblokApi.getStory("home", {
      version,
      resolve_relations: relations.join(","),
    });
    story = home.data ? home.data.story : null;
  } catch {
    story = null
  }

  if (!story) {
    try {
      const splash = await storyblokApi.getStory("splash", {
        version,
        resolve_relations: relations.join(","),
      });
      story = splash.data ? splash.data.story : null;
    } catch {
      story = null
    }
  }

  const _projects = await storyblokApi.getStories({
    version,
    content_type: "project",
    sort_by: "created_at:desc",
  });

  const projects = _projects.data ? _projects.data.stories : null;

  const _posts = await storyblokApi.getStories({
    version,
    content_type: "post",
    sort_by: "created_at:desc",
  });

  const posts = _posts.data ? _posts.data.stories : null;

  return {
    props: {
      story,
      lists: {
        projects,
        posts,
      },
      draft: !!draftMode,
    },
    revalidate: 3600,
  };
};