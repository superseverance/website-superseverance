import type { Text as TextType } from "@/sbComponentType"
import { tv } from "tailwind-variants"
import Markdown from "markdown-to-jsx/react"

import {
    SbBlokData,
    storyblokEditable,
} from "@storyblok/react"

export interface TextComponent {
    blok: TextType & SbBlokData
}

const classes = tv({
    slots: {},
    variants: {},
})

export function Text({ blok }: TextComponent) {
    const { content } = blok
    const { } = classes()

    return (
        <div {...storyblokEditable(blok)}>
            <Markdown>{content}</Markdown>
        </div>
    )
}