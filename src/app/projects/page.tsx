import {Navlist} from "@/app/components/nav/Navlist";
import {NavListSearch} from "@/app/components/nav/NavListSearch";
import {Suspense} from "react";
import NavLoading from "@/app/components/nav/NavLoading";

export default function Page() {
    return(
        <div className={"flex-row flex mx-10"}>
            <div className={"basis-1/6 back"}>
                <div className={""}>
                    <div className={"flex flex-col text-white mr-5"}>
                        <div className={""}>
                            <h1 className={"text-5xl font-bold mb-5"}>Student</h1>
                            <h1 className={"text-5xl font-bold"}>Projects</h1>
                        </div>
                        <div className={"static"}>
                            <p className={"my-4"}>
                                Every year since 1988, WPI students have carried out relevant projects in order to solve issues and problems of the city of Venice with a scientific and technological approach.
                            </p>
                            <p className={"my-4"}>
                                In 30 years of activity, the projects have covered a wide range of topics, from conservation of cultural heritage to in-depth analysis of the hydrogeological data of the lagoon.
                            </p>
                            <p className={"my-4"}>
                                Many of these projects have inspired and started the creation of Venetian start-ups.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"w-fit basis-full"}>
                <NavListSearch type={"IQP"}></NavListSearch>
            </div>
        </div>
    );
}