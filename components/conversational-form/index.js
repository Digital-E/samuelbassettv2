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



const Form = ({trigger, showProjects}) => {
    let formRef = useRef();
    let cfInstance = useRef();

    let date = new Date();

    date = date.toLocaleTimeString("en-GB", { timeZone: 'Europe/Paris' });

    date = date.split(":");

    date = `${date[0]}:${date[1]}`


    let formFields = [
        {
            "tag": "fieldset",
			"cf-questions": `Hello, nice to meet you! 👋🏻&&It's currently ${date} in Paris&&I’m probably deep down the rabbit hole as we speak&&Anyway, I digress... you're here to see my work right?`,
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
            "cf-questions": "Alright, well here it is… Abracadaba!🔮&&While you're here I'll tell you a bit more about myself.&&I’m a developer and designer focused on future-oriented web experiences for the New Age, leveraging next generation technologies for scalable, long-lasting, human-centered web solutions.&&If you like what you see and think we should work together, please <a href='mailto:hello@samuelbassett.xyz'>get in touch</a>, I’d love to hear about your project!",
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
			"tag": "select",
            "cf-questions": "Oh, that's a shame!",
            "cf-conditional-cfc-intro": "no",
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
      ];

    const submitCallback = () => {
        // var formDataSerialized = cfInstance.current.getFormData(true);
        // console.log("Formdata, obj:", formDataSerialized);
        // cfInstance.current.addRobotChatResponse("You are done. Check the dev console for form data output.")
    }

    useEffect(() => {
        // let flowCallback = (e) => {
        //     console.log(e)
        // }

        var dispatcher = new EventDispatcher();

        dispatcher.addEventListener(ControlElementEvents.SUBMIT_VALUE, function(e) {
            if(e.detail.referenceTag.name === "cfc-intro" && e.detail.referenceTag.value === "yes") {
                showProjects();
            }
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