import { Fragment } from "react";
import type { GetStaticPropsContext } from "next";
import { relations } from "@/config/storyblok";
import { ExitPreview } from "@/libs/ExitPreview";
import { ListsProps } from "@/components/Lists"
import {
  getStoryblokApi,
  ISbStoryData,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";


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

  const _news = await storyblokApi.getStories({
    version,
    content_type: "news",
    sort_by: "created_at:desc",
  });

  const news = _news.data ? _news.data.stories : null;

  const _events = await storyblokApi.getStories({
    version,
    content_type: "event",
    sort_by: "created_at:desc",
  });

  const events = _events.data ? _events.data.stories : null;

  return {
    props: {
      story,
      lists: {
        news,
        events,
      },
      draft: !!draftMode,
    },
    revalidate: 3600,
  };
};