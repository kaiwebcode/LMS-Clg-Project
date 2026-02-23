"use client";

import { AdminCoursesType } from "@/app/data/admin/admin-get-courses";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { ArrowRight, Eye, MoreVertical, Pencil, School, TimerIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AdminCourseCardProps {
  data: AdminCoursesType[number];
}

export default function AdminCourseCard({ data }: AdminCourseCardProps) {

    const thumbnailUrl = useConstructUrl(data.fileKey); 

  return (
    <Card className="group relative py-0 gap-0">
      {/* absolute dropdown */}

      <div className="absolute cursor-pointer top-2 right-2 z-10">
        <DropdownMenu >
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button variant="outline" size="icon">
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                    <Link href={`/admin/courses/${data.id}/edit`} className="w-full">
                        <Pencil className="size-4 mr-2" /> 
                        Edit Course
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/courses/${data.slug}`} className="w-full">
                        <Eye className="size-4 mr-2" /> 
                        Preview Course
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/admin/courses/${data.id}/delete`} className="w-full">
                        <Trash2 className="size-4 mr-2 text-destructive" /> 
                        Delete Course
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Image src={thumbnailUrl} alt={data.title} width={500} height={300}
      className="w-full rounded-t-lg aspect-video h-full object-cover" />

        <CardContent className="p-4 ">
            <Link href={`/admin/courses/${data.id}/edit`} className="text-lg font-semibold line-clamp-2 hover:underline
            group-hover:text-primary transition-colors duration-300">
                {data.title}
            </Link>

            <p className="text-sm text-muted-foreground line-clamp-3 mt-2" >
                {data.smallDescription}
            </p>

            <div className="mt-4 flex items-center gap-x-5">
                <div className="flex items-center gap-x-1">
                    <TimerIcon className="size-8 p-1.5 rounded-md text-primary bg-primary/15" />
                    <span className="text-sm text-muted-foreground">{data.duration}H</span>
                </div>
                  <div className="flex items-center gap-x-1">
                    <School className="size-8 p-1.5 rounded-md text-primary bg-primary/15" />
                    <span className="text-sm text-muted-foreground">{data.level}</span>
                </div>
            </div>

            <Link href={`/admin/courses/${data.id}/edit`}>
                <Button className={buttonVariants({
                    className: 'w-full mt-4 cursor-pointer'
                })}>
                    Edit Course <ArrowRight className="size-4 ml-2" />
                </Button>
            </Link>
        </CardContent>

      {/* <h2 className="text-lg font-semibold">Course Title</h2>
      <img
        src="/path/to/image.jpg"
        alt="Course Title"
        width={500}
        height={300}
        className="object-cover rounded-md mb-2"
      />
      <p className="text-sm text-gray-600">{course.smallDescription}</p>
      <p className="text-sm text-gray-600">Duration: {course.duration}</p>
      <p className="text-sm text-gray-600">Level: {course.level}</p>
      <p className="text-sm text-gray-600">Price: ${course.price}</p>
      <button className={buttonVariants({ variant: "outline" })}>Edit</button> */}
    </Card>
  );
}
