import {NextRequest, NextResponse} from "next/server";
import {ProjectRequestResponse} from "@/app/api/projects/datatypes/ProjectRequestResponse";
import {Project, IqpTeam, Dataurl, PROJECT_TYPE, Prisma,} from '@prisma/client'
import { prisma } from '../db'
import {ProjectGetRequestBody} from "@/app/api/projects/datatypes/ProjectGetRequestBody";
import DataurlCreateManyProjectInput = Prisma.DataurlCreateManyProjectInput;
import {FullProject} from "@/app/components/ProjectContent/FullProject";

export async function GET(request:NextRequest) {
    let id = await request.nextUrl.searchParams.get("id");
    let type = await request.nextUrl.searchParams.get("type");
    console.log(type)
    let data: ProjectRequestResponse;
    if(id == null) {
        const allProjects = await getProject("",type == null ? "" : type);
        data = {
            projects: allProjects
        }
    } else {
        let project = await getProject(id,"");
        data = {
            projects:project
        }
    }
    return NextResponse.json(data);
}

export async function POST(request: Request) {
    let project:FullProject = await request.json();
    let test = project;
    if (project.id == undefined) {
        let iqpTeamQuery = {};
        let dataUrls: DataurlCreateManyProjectInput[] = [];
        if (project.iqp_team != null) {
            iqpTeamQuery = {
                create: {
                    id: project.iqp_team.id,
                    team: {
                        create: project.iqp_team.team
                    },
                }
            }
        }
        if (project.dataurls != null) {
            dataUrls = project.dataurls as DataurlCreateManyProjectInput[];
        }
        const createProjectWithTeam = await prisma.project.create({
            data: {
                title: project.title,
                description: project.description,
                term:project.term,
                img: project.img,
                year:project.year,
                type:project.type,
                dataurls: {
                    createMany: {
                        data: dataUrls
                    }
                },
                iqp_team: iqpTeamQuery
            }
        });
        return NextResponse.json(createProjectWithTeam);
    } else {
        let dataUrls:Dataurl[] = [];
        if(project.dataurls != null) {
            for (let i = 0; i < project.dataurls.length; i++) {
                dataUrls.push(project.dataurls[i]);
            }
        }
        let upsertObject = dataUrls.map((dataUrl) => {
            return {
                where: {
                    id:dataUrl.id
                },
                update: {
                    url: dataUrl.url,
                    text: dataUrl.text,
                    type: dataUrl.type,
                },
                create: {
                    url: dataUrl.url,
                    text: dataUrl.text,
                    type: dataUrl.type,
                }
            }
        });
        if (project.iqp_team != null) {
            const updateProject =   await prisma.project.update({
                where: {
                    id: project.id
                },
                data: {
                    title: project.title,
                    description: project.description,
                    type: project.type,
                    term: project.term,
                    img: project.img,
                    year: project.year,
                    iqp_team: {
                        update: {
                            id: project.iqp_team.id,
                            team: {
                                upsert: project.iqp_team.team?.map((entity) => {
                                    return {
                                        where:{
                                            id:entity.id
                                        },
                                        update: {
                                            name:entity.name,
                                            type:entity.type
                                        },
                                        create: {
                                            name:entity.name,
                                            type:entity.type
                                        },
                                    }
                                })
                            },
                        }
                    },
                    dataurls: {
                        upsert: upsertObject
                    }
                }
            });
            return NextResponse.json(updateProject);
        } else {
            const updateProject = await prisma.project.update({
                where: {
                    id: project.id
                },
                data: {
                    title: project.title,
                    description: project.description,
                    type: project.type,
                    term: project.term,
                    img: project.img,
                    year: project.year,
                    dataurls: {
                        upsert: upsertObject
                    }
                },
            });
            return NextResponse.json(updateProject);
        }
    }
}

//TODO rework and simplify
export async function getProject(id:string,type:string):Promise<FullProject[]> {
    let projects:FullProject[] = [];
    if(id === "") {
        if(type === "") {
            projects = await prisma.project.findMany({
                include: {
                    dataurls: true,
                    iqp_team: {
                        include: {
                            team:true,
                        }
                    },
                    tags: true

                }
            });
        } else {
            let typeEnum = PROJECT_TYPE[type as keyof typeof PROJECT_TYPE]
            projects = await prisma.project.findMany({
                where: {
                    type:typeEnum
                },
                include: {
                    dataurls: true,
                    iqp_team: {
                        include: {
                            team:true,
                        }
                    },
                    tags: true
                }
            });
        }
    } else {
        const project:FullProject | null = await prisma.project.findFirst({
            where: {
                id: id
            },
            include:{
                dataurls:true,
                iqp_team: {
                    include: {
                        team:true,
                    }
                },
                tags:true
            }
        });
        if(project != null) {
            projects.push(project)
        }
    }
    return projects;
}