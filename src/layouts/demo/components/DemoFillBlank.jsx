import React , { useState } from 'react';
import ReactHtmlParser from "react-html-parser";
import styleToObject from 'style-to-object';
const DemoFillBlank = ()=>{
    const text = '<p style="color:red">dien vao gdscho *1* djshfkshjdfh *2* sdfsdf sdfsf *3*  sdjhfskfhskjdfh </p>'
   
    return(<>
    <TextWithInputs text={text} />
    
    </>)
}
export default DemoFillBlank;




const TextWithInputs = ({ text }) => {
  const parts = text.split("*");

  return (
    <div>
      {ReactHtmlParser(text, {
        transform: (node, index) => {
          debugger
          if (node.type === "tag") {
            if (node.attribs.style) {
                node.attribs.style = styleToObject(node.attribs.style);
              }
              if (node.attribs.class) {
                node.attribs.class = styleToObject(node.attribs.class);
              }
            return (
              <p key={index} className={node.attribs.class} style={node.attribs.style}>
                {node.children.map((child, childIndex) => {
                  debugger
                  if (child.type === "text") {
                    const childParts = child.data.split("*");
                    return childParts.map((part, partIndex) => {
                      debugger
                      if (partIndex % 2 === 0) {
                        return <span key={childIndex + partIndex}>{part}</span>;
                      } else {
                        const inputIndex = parseInt(part);
                        return <input key={childIndex + partIndex} onChange={(e1)=>{
                            console.log(e1.target.value, partIndex)
                        }} type="text" />;
                      }
                    });
                  } else {
                    // return React.createElement(child.name, {
                    //   key: childIndex,
                    //   className: child.attribs.class,
                    //   style: child.attribs.style,
                    //   children: child.children,
                    // });
                  }
                })}
              </p>
            );
          } else {
            return React.createElement(node.name, {
              key: index,
              className: node.attribs?.class,
              style: node.attribs?.style,
              children: node?.children,
            });
          }
        },
      })}
    </div>
  );
};


// const FormComponent = () => {
//     const html = '<p style="color:red">dien vao gdscho *1* djshfkshjdfh *2* sdfsdf sdfsf *3*  sdjhfskfhskjdfh </p>';
//     const [values, setValues] = useState({});
  
//     const handleInputChange = (event) => {
//       const { name, value } = event.target;
//       setValues({ ...values, [name]: value });
//     };
  
//     const formInputs = {};
  
//     const options = {
//       decodeEntities: true,
//       transform: (node) => {
//         if (node.type === 'tag' && node.name === 'input' && node.attribs.name) {
//           const name = node.attribs.name;
//           formInputs[name] = node;
//           return (
//             <input
//               {...node.attribs}
//               key={name}
//               onChange={handleInputChange}
//               value={values[name] || ''}
//             />
//           );
//         }
//         return node;
//       },
//     };
  
//     return (
//       <div>
//         {ReactHtmlParser(html, options)}
//         <button onClick={() => console.log(values)}>Submit</button>
//       </div>
//     );
//   };