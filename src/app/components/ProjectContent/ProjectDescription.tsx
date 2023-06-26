import {Project} from "@prisma/client";
import React from "react";

export function ProjectDescription(props:{project:Project,onBlur?: (event: any) => void,contentEditable?: boolean}) {
    return(
        <p id={"description"} className={"text-white leading-loose text-lg my-10"} contentEditable={props.contentEditable} onBlur={props.onBlur}>{props.project.description}</p>
    )
}