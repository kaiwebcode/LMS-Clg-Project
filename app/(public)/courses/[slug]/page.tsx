import { getIndividualCourse } from "@/app/data/courses/get-course";
import RenderDescription from "@/components/Text-Editor/RenderDescription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { useConstructUrl } from "@/hooks/use-construct-url";
import {
  IconBook,
  IconCategory,
  IconChartBar,
  IconChevronsDown,
  IconClock,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { CheckIcon } from "lucide-react";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

export default async function SlugPage({ params }: { params: Params }) {
  const course = await getIndividualCourse((await params).slug);
  const thumbnailUrl = useConstructUrl(course.fileKey);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-8">
        {/* COURSE IMAGE */}
        <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-xl">
          <Image
            src={thumbnailUrl}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-blue-500/20 to-transparent" />
        </div>

        {/* TITLE */}
        <div className="space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            {course.title}
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            {course.smallDescription}
          </p>

          {/* BADGES */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <IconCategory size={16} />
              {course.category}
            </Badge>

            <Badge variant="secondary" className="flex items-center gap-1">
              <IconChartBar size={16} />
              {course.level}
            </Badge>

            <Badge variant="secondary" className="flex items-center gap-1">
              <IconClock size={16} />
              {course.duration} hrs
            </Badge>
          </div>
        </div>

        <Separator />

        {/* DESCRIPTION */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Course Description</h2>

          <RenderDescription description={JSON.parse(course.description)} />
        </div>

        <Separator />

        {/* COURSE CONTENT */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Course Content</h2>

            <p className="text-sm text-muted-foreground">
              {course.chapter.length} Chapters •{" "}
              {course.chapter.reduce(
                (total, chapter) => total + chapter.lessons.length,
                0,
              ) || 0}{" "}
              Lessons
            </p>
          </div>

          <div className="space-y-4">
            {course.chapter.map((chapter, index) => (
              <Collapsible key={chapter.id} defaultOpen={index === 0}>
                <Card className="p-0 overflow-hidden hover:shadow-lg transition-all duration-200 gap-0 ">
                  <CollapsibleTrigger className="w-full">
                    <div>
                      <CardContent className="p-6 hover:bg-muted/50 transition-colors">
                        <div className=" flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <p className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                              {index + 1}
                            </p>
                            <div>
                              <h3 className="text-xl font-semibold text-left">
                                {chapter.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1 text-left">
                                {chapter.lessons.length} Lesson
                                {chapter.lessons.length !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge
                              variant={"outline"}
                              className="flex items-center gap-1 px-2"
                            >
                              {chapter.lessons.length} Lesson
                              {chapter.lessons.length !== 1 ? "s" : ""}
                            </Badge>

                            <IconChevronsDown className="size-5 text-muted-foreground" />
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="border-t bg-muted/20">
                      <div className="p-6 pt-4 space-y-3">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-4 text-sm p-3 rounded-lg  hover:bg-accent transition-colors group"
                          >
                            <div className="flex size-8 items-center justify-center rounded-full bg-background border-2 border-primary/40 text-primary font-semibold">
                              <IconPlayerPlay className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Lesson {lessonIndex + 1}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>

          {/* CHAPTERS */}
          {/* <div className="space-y-4">
            {course.chapter.map((chapter, index) => (
              <Collapsible
                key={chapter.id}
                defaultOpen={index === 0}
                className="border rounded-xl overflow-hidden"
              >
                <CollapsibleTrigger className="w-full">
                  <Card className="border-none shadow-none hover:bg-muted/40 transition">
                    <CardContent className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {index + 1}
                        </div>

                        <div className="text-left">
                          <p className="font-semibold p-0 ">{chapter.title}</p>

                          <p className="text-sm text-muted-foreground">
                            {chapter.lessons.length} lessons
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="bg-muted/30 px-6 pb-4 pt-2 space-y-3">
                    {chapter.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-muted"
                      >
                        <IconPlayerPlay size={16} />

                        <span>{lesson.title}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div> */}
        </div>
      </div>

      {/* RIGHT SIDE CARD */}
      <div className="order-2 lg:col-span-1">
        <Card className="sticky top-24 shadow-lg">
          <CardContent className="py-0 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-medium ">Price: </span>
              <span className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(course.price)}
              </span>
            </div>

            <div className="mb-6 space-y-3 rounded-lg bg-primary/10 p-4">
              <h4 className="font-medium">What you will get:</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 ">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    <IconClock className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Course Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {course.duration} hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 ">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    <IconChartBar className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Difficulty Level</p>
                    <p className="text-sm text-muted-foreground">
                      {course.level}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 ">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    <IconCategory className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-muted-foreground">
                      {course.category}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 ">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    <IconBook className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Lessons</p>
                    <p className="text-sm text-muted-foreground">
                      {course.chapter.reduce(
                        (total, chapter) => total + chapter.lessons.length,
                        0,
                      ) || 0}{" "}
                      lessons
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="space-y-2 text-sm text-muted-foreground">
              <p>✔ Lifetime access</p>
              <p>✔ All future updates</p>
              <p>✔ Certificate of completion</p>
              <p>✔ Mobile & Desktop access</p>
            </div> */}

            <div className="mb-6 space-y-3">
              <h4 className="font-medium">This course includes:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-3 text-sm">
                  <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                    <CheckIcon size={16} />
                  </div>
                  <span className="mt-0.5">Full lifetime access</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                    <CheckIcon size={16} />
                  </div>
                  <span className="mt-0.5">Access on Mobile and desktop</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="rounded-full bg-green-500/20 p-1 text-green-500">
                    <CheckIcon size={16} />
                  </div>
                  <span className="mt-0.5">Certificate of completion</span>
                </li>
              </ul>
            </div>

            <Button className="w-full" size="lg">
              Enroll Now!
            </Button>
            <p className=" text-center text-xs text-muted-foreground">
              30-day money back guarantee
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
