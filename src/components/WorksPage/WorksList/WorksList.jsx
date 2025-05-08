import useIsMobile from "@/lib/helpers/useIsMobile";
import { WorkCard } from "@/utils/WorkCard/WorkCard";
import React from "react";

import "./WorksList.scss";
import { AnimatePresence, motion } from "framer-motion";
import { anim, fadeIn } from "@/lib/helpers/anim";

export default function WorksList({ data, filter }) {
  const isMobile = useIsMobile();
  const evenWorks = [];
  const oddWorks = [];

  // Split the works into two arrays
  if (data?.length) {
    data.forEach((work, index) => {
      if (index % 2 === 0) {
        evenWorks.push(work);
      } else {
        oddWorks.push(work);
      }
    });
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        {...anim(fadeIn())}
        key={`${data.length}-${filter}`}
        className="works-list"
      >
        {isMobile ? (
          <div className="works-list__wrapper">
            {data.map((work, index) => (
              <WorkCard data={work} key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="works-list__wrapper">
              {evenWorks.map((work, index) => (
                <WorkCard data={work} key={`even-${index}`} />
              ))}
            </div>
            <div className="works-list__wrapper">
              {oddWorks.map((work, index) => (
                <WorkCard data={work} key={`odd-${index}`} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
