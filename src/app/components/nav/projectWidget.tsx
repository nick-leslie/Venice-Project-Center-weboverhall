import {Project} from "@prisma/client";
import Image from "next/image";

interface ProjectLinkProps {
    project: Project
}

export function ProjectWidget({project}: ProjectLinkProps) {
    let imgSrc = "";
    if(project.img != null) {
        imgSrc = project.img
        console.log(imgSrc)
    }
    let projectTags = ""
    for (let i = 0; i < project.tags.length; i++) {
        if(i < project.tags.length-1) {
            projectTags += project.tags[i] + ","
        } else {
            projectTags += project.tags[i];
        }
    }
    return(
        <div className={"text-white flex flex-row"}>
            <Image src={imgSrc} height={50} width={50} alt={"iqp image"}></Image>
            <div className={"flex flex-col"}>
                <h1>
                    {project.title}
                </h1>
                <h1>
                    {project.description}
                </h1>
            </div>
            <div className={"flex flex-col"}>
                {projectTags}
            </div>
        </div>
    )
}