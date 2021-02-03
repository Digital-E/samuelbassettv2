import { useRef, useEffect } from "react";


let ConversationalForm;
let EventDispatcher;
let ControlElementEvents;


import robotImageURL from "../../public/icons/me.png"


if (typeof window !== "undefined") {
    ConversationalForm = require("conversational-form").ConversationalForm
    EventDispatcher = require("conversational-form").EventDispatcher
    ControlElementEvents = require("conversational-form").ControlElementEvents
}



const Form = ({trigger, showProjects, projects}) => {
    let formRef = useRef();
    let cfInstance = useRef();

    let date = new Date();

    date = date.toLocaleTimeString("en-GB", { timeZone: 'Europe/Paris' });

    let dateHour = parseInt(date.split(":")[0])

    date = date.split(":");

    date = `${date[0]}:${date[1]}`


    const createProjectsMobile = () => {
        let linksArray = ["<br class='mobile-link'/>"];
        projects.forEach(item => {
          let link = `<a href='${item.link}' target='_blank' class='mobile-link'>${item.name}</a> ${item.description}`;
    
          linksArray.push("<br class='mobile-link'/>");
          linksArray.push(link);
        })
    
        return linksArray.join("");
      }

    let projectsMobile = "";


    let formFields = [];


    const submitCallback = () => {
        // var formDataSerialized = cfInstance.current.getFormData(true);
        // console.log("Formdata, obj:", formDataSerialized);
        // cfInstance.current.addRobotChatResponse("You are done. Check the dev console for form data output.")
    }

    useEffect(() => {
        // let flowCallback = (e) => {
        //     console.log(e)
        // }

        projectsMobile = createProjectsMobile();

        formFields = [
            {
                "tag": "fieldset",
                "cf-questions": `Hello, nice to meet you! 👋🏻&&It's currently ${date} in Paris&&${((dateHour > 21 && dateHour <= 0) || (dateHour >= 0 && dateHour < 7)) ? "I'm surely fast asleep right now 😴" : "I’m probably deep down the rabbit hole as we speak"}&&Anyway, I digress... you're here to see my work right?`,
                "children":[
                    {
                        "tag": "input",
                        "type": "radio",
                        "name": "cfc-intro",
                        "cf-label": "yes",
                        "value": "yes"
                    },
                    {
                        "tag": "input",
                        "type": "radio",
                        "name": "cfc-intro",
                        "cf-label": "no",
                        "value": "no"
                    }
                ]
            },
            {
                "tag": "select",
                "cf-questions": `Alright, well here it is… Abracadaba!🔮${projectsMobile}&&While you're here I'll tell you a bit more about myself.&&I’m a developer and designer focused on future-oriented web experiences for the New Age, leveraging next generation technologies for scalable, long-lasting, human-centered web solutions.&&If you like what you see and think we should work together, please <a href='mailto:hello@samuelbassett.xyz'>get in touch</a>, I’d love to hear about your project!&&As you're still here... I think you deserve a special gift&&Want to see it?`,
                "cf-conditional-cfc-intro": "yes",
                "children":[
                    {
                        "tag": "option",
                        "name": "cfc-intro-1",
                        "cf-label": "yes",
                        "value": "yes"
                    },
                    {
                        "tag": "option",
                        "name": "cfc-intro-1",
                        "cf-label": "no",
                        "value": "no"
                    }
                ]
            },
            {
                "tag": "input",
                "cf-questions": "Oh, that's a shame!&&If ever you change you’re mind you can always press the arrow above and reverse time 😉",
                "cf-conditional-cfc-intro": "no",
            },
            {
                "tag": "input",
                "cf-questions": "Here's a link to my super secret <a href='https://www.google.com' target='_blank'>Google Drive <img id='google-drive-icon' src='./icons/google-drive.svg'/></a> with a selection of past projects and work in progress...&&Hope you enjoy, and see you soon!&&And don't forget...&&<a href='https://www.youtube.com/watch?v=cJMwBwFj5nQ' target='blank'>Be as water my friend!</a>🙅🏼‍♂️🥋",
                "cf-conditional-cfc-intro-1": "yes",
            },
          ];

        var dispatcher = new EventDispatcher();

        dispatcher.addEventListener(ControlElementEvents.SUBMIT_VALUE, function(e) {
            let messageAlert = new Audio("/sounds/your-turn-491.mp3");
            messageAlert.play();
            if(e.detail.referenceTag.name === "cfc-intro" && e.detail.referenceTag.value === "yes") {
                    showProjects();
            } 
            // else if (e.detail.referenceTag.name === "cfc-intro" && e.detail.referenceTag.value === "no") {
            //     cfInstance.current.addRobotChatResponse("Oh, that's a shame!&&If ever you change you’re mind you can always press the arrow above and reverse time 😉")
            // }
        }, false)


        cfInstance.current = ConversationalForm.startTheConversation({
            options: {
                userInterfaceOptions:{
                    controlElementsInAnimationDelay: 250,
                    robot: {
                        robotResponseTime: 0,
                        chainedResponseTime: 650
                    },
                },
              submitCallback: submitCallback,
              eventDispatcher: dispatcher,
            //   flowStepCallback: flowCallback,
              robotImage: robotImageURL,
              preventAutoFocus: true,
              preventAutoStart: true,
            },
            tags: formFields
          });


          
          formRef.current.appendChild(cfInstance.current.el);


          () => {
            formRef.current.removeChild(cfInstance.current.el);
          }
    },[]);

    useEffect(() => {
        if(trigger) {
            cfInstance.current.start()
        }
    },[trigger])

    return <div ref={formRef}></div>
}

export default Form;