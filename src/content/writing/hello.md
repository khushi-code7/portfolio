---
title: Starting again, with less
summary: Notes on rebuilding a personal site and deliberately leaving things out.
date: 2026-07-26
tags: ['Process']
---

Every personal site I have built before this one started with a framework and a
list of features. This one started with a list of things it would not have.

No comments. No analytics dashboard. No search across four posts. No client-side
router to save a network request that takes forty milliseconds anyway. No theme
toggle, because the operating system already knows whether it is dark outside.

What is left is text, arranged carefully, that loads immediately.

## The test I used

For each feature I wanted to add, I asked: if this were missing, would a reader
notice — or would only I notice? Analytics fail that test. So does a tag
taxonomy for a site with two posts. So does most of what makes a site feel
"built" rather than written.

The things that survive are unglamorous. Legible type at a comfortable measure.
Real focus states. Alt text. A page that reflows sensibly at 360 pixels wide
because that is how most people will actually see it.

## The cost of the alternative

The reason to be strict about this is not purity. It is that every dependency is
a thing that can break while you are not looking, and a personal site is
precisely the kind of project nobody looks at for eighteen months.

A site made of Markdown files and static HTML has a very short list of ways to
fail. That is worth more to me than any feature I left out.
