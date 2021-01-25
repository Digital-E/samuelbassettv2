import React, { useEffect } from "react";
import "../styles/index.css";
import "../public/styles/flickity.css";

import { StateProvider } from "../store";

import { motion, AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps, router}) {

  useEffect(()=>{
    setTimeout(() => {
      document.querySelector(".hide-content").classList.add("show-content");
    }, 500);
  },[]);



  return (
    <StateProvider>
      <div className="hide-content">
      <AnimatePresence exitBeforeEnter 
      onExitComplete={() => { window.scrollTo(0,0) }}
      > 
      <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" exit= "pageExit"
        variants={{
          pageInitial: {
            opacity: 0
          },
          pageAnimate: {
            opacity: 1,
            duration: 0.3,
          },
          pageExit: {
            opacity: 0,
            transition: {
              delay: 0,
              duration: 0.3,
            }
          }
        }}
        >      
        <Component {...pageProps} />
      </motion.div>
      </AnimatePresence>      
      </div>
    </StateProvider>
  );
}

export default MyApp;
