"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function Home(props: any) {
  const [hasNext, setHasNext] = useState(true);
  const [nextOrgId, setNextOrgId] = useState(1);
  const [total, setTotal] = useState(0);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [index, setIndex] = useState(2);

  async function getList() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.globalgiving.org/api/public/projectservice/all/projects.json?api_key=6be090b7-dd10-4703-aefa-2926fbdbe81d&nextOrgId=${nextOrgId}&json`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "json",
          },
        },
      );
      const data = await response.json();
      setHasNext(data.projects.hasNext);
      setNextOrgId(data.projects.nextOrgId);
      setProjects(data.projects.project);
      setTotal(data.projects.numberFound);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("projects", projects);
    getList();
  }, []);

  // const fetchData = useCallback(async () => {
  //   if (isLoading) return;

  //   setIsLoading(true);

  //   const response = await fetch(
  //     `https://api.globalgiving.org/api/public/projectservice/all/projects.json?api_key=6be090b7-dd10-4703-aefa-2926fbdbe81d&nextOrgId=${nextOrgId}&json`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "json",
  //       },
  //     },
  //   );
  //   const data = await response.json();
  //   console.log("data", data);
  //   setHasNext(data.projects.hasNext);
  //   setNextOrgId(data.projects.nextOrgId);
  //   setProjects(data.projects.project as any);
  //   setTotal(data.projects.numberFound);
  //   setIndex((prevIndex) => prevIndex + 1);

  //   setIsLoading(false);
  // }, [index, isLoading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between light">
      <Header />

      <div className="container">
        <InfiniteScroll
          dataLength={projects.length}
          next={getList}
          hasMore={hasNext}
          loader={<Loader />}
          className="sm:flex sm:justify-center sm:gap-5 sm:flex-wrap mt-24"
        >
          {projects.map((project: any) => {
            return (
              <Card
                key={project.id}
                title={project.title}
                country={project.country}
                image={project.imageLink}
                url={project.url}
                mission={project.summary}
                themes={project.themes.theme}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </main>
  );
}
