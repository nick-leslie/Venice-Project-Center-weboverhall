import {NextRequest, NextResponse} from "next/server";
import {Dataurl} from "@prisma/client";
import {DataUrlArray, isDataUrlArray} from "@/app/api/projects/dataurl/DataUrlArray";
import {prisma} from "@/app/api/db";



export async function POST(request:NextRequest) {
    console.log("gameing")
    let dataUrl:DataUrlArray | Dataurl = {data:[]}
    console.log("hello world")
    try {
        dataUrl = await request.json();
    } catch (error) {
        return NextResponse.json("bad request")
    }
    if(isDataUrlArray(dataUrl)) {
        for (let i = 0; i < dataUrl.data.length; i++) {
            let dataUrlObeject = dataUrl.data[i];
            await createOrUpdateDataUrl(dataUrlObeject)
        }
    } else {
        await createOrUpdateDataUrl(dataUrl)
    }

    return NextResponse.json("created or updated data urls")
}

async function createOrUpdateDataUrl(dataUrl:Dataurl) {
    if (dataUrl.id != undefined) {
        const checkDb = await prisma.dataurl.findFirst({
            where: {
                id: dataUrl.id
            }
        });
        if (checkDb != null) {
            //update
            await prisma.dataurl.update({
                where: {
                    id: dataUrl.id
                },
                data: {
                    projectId: dataUrl.projectId,
                    url: dataUrl.url,
                    text: dataUrl.text,
                    type: dataUrl.type
                }
            })
            return;
        }
    }
    //create
    await prisma.dataurl.create({
        data: {
            projectId: dataUrl.projectId,
            url: dataUrl.url,
            text: dataUrl.text,
            type: dataUrl.type
        }
    })
    console.log("created data url")
}