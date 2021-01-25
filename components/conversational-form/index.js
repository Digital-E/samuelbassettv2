import { useRef, useEffect } from "react";


let ConversationalForm;

import robotImageURL from "../../public/icons/me.png"


if (typeof window !== "undefined") {
    ConversationalForm = require("conversational-form").ConversationalForm
}
// const { ConversationalForm, EventDispatcher } = require("conversational-form")




const Form = () => {
    let formRef = useRef();
    let cfInstance = useRef();

    let formFields = [
        {
            "tag": "fieldset",
			"cf-questions": "Hello, Nice to meet you! 👋🏻&&It's currently 00:00 in Paris&&I’m probably deep down the rabbit hole as we speak.&&I guess you're here to see my work right?",
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
            "cf-questions": "Ok cool!",
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
        cfInstance.current = ConversationalForm.startTheConversation({
            options: {
              submitCallback: submitCallback,
              robotImage: robotImageURL,
              preventAutoFocus: true,
              // loadExternalStyleSheet: false
            },
            tags: formFields
          });
          
          formRef.current.appendChild(cfInstance.current.el);

          () => {
            formRef.current.removeChild(cfInstance.current.el);
          }
    },[]);

    return <div ref={formRef}></div>
}

export default Form;