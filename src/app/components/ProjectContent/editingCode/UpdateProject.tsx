import {Dataurl, IqpTeam, Project} from "@prisma/client";
import {FullProject} from "@/app/components/ProjectContent/FullProject";
export interface OnUpdateStateCallback {
    (project:FullProject):void
}


export function UpdateProject(id:string,content:string
    ,editedProject:FullProject
    ,OnUpdatedState: OnUpdateStateCallback ) {
    let idWithoutNum = id.replace(/[0-9]/g, '').replace(/ /g,"").toLowerCase();
    let index = -1;
    console.log(idWithoutNum)
    switch (idWithoutNum) {
        case 'description':
            editedProject.description = content
            break;
        case 'title':
            editedProject.title = content
            break;
        case 'year':
            editedProject.year = parseInt(content);
            break;
        case 'term':
            //TODO add checks to make sure its a valid term
            editedProject.term = content[0];
            break;
        case 'iqpentity':
            index = parseInt(id.replace(/\D/g,''));
            if(editedProject.iqp_team?.team?.at(index) !== undefined) {
                editedProject.iqp_team.team[index].name = content
            }
            break;
    }
    OnUpdatedState(editedProject);
}