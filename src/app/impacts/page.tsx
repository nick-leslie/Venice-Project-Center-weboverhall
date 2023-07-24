import {Navlist} from "@/app/components/nav/Navlist";
import {NavListSearch} from "@/app/components/nav/NavListSearch";
import {PROJECT_TYPE} from "@prisma/client";

export default function Page() {
    return(
        <div className={"flex-col md:flex-row flex mx-10"}>
            <div className={"basis-1/3 back"}>
                <div className={"flex flex-col text-white"}>
                    <h1>input params</h1>
                </div>
            </div>
            <div className={"w-fit basis-full"}>
                <NavListSearch type={PROJECT_TYPE.IMPACT}></NavListSearch>
            </div>
        </div>
    );
}