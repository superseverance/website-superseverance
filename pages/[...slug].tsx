import { LayoutComponent } from "@/pages/index";
import type { GetStaticPropsContext } from "next";
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";

import { relations } from "@/config/storyblok";
import { Fragment } from "react";
import { ExitPreview } from "@/libs/ExitPreview";

export default function Slug({ story, lists, draft }: LayoutComponent) {
  const page = useStoryblokState(story, {
    resolveRelations: relations.join(","),
    preventClicks: true,
  });

  if (!page) return null;
  return (
    <Fragment>
      <StoryblokComponent blok={page?.content} lists={lists} story={page} />;
      <ExitPreview enable={!!draft} slug={page.slug} />
    </Fragment>
  )
}

export const getStaticProps = async ({ params, draftMode }: GetStaticPropsContext) => {
  const version = process.env.NODE_ENV === "development" ? "draft" : !!draftMode ? "draft" : "published"

  const slug = Array.isArray(params?.slug) ? params.slug.join("/") : "home";
  const storyblokApi = getStoryblokApi();

  let story
  try {
    const _story = await storyblokApi.getStory(slug, {
      version,
      resolve_relations: relations.join(","),
    });

    story = _story.data ? _story.data.story : null;
  } catch {
    story = null
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

export const getStaticPaths = async () => {
  const storyblokApi = getStoryblokApi();
  const stories = await storyblokApi.getStories({
    version: "published",
    resolve_relations: relations.join(","),
  });

  const layoutComponents = ["page", "project", "post"];

  const paths = stories.data.stories
    .filter(
      ({ content: { component }, slug }) =>
        slug !== "home" && !!component && layoutComponents.includes(component)
    )
    .map((story) => {
      const slug = story.full_slug === "home" ? [] : story.full_slug.split("/");
      return { params: { slug: slug } };
    });

  return { paths, fallback: "blocking" };
};
