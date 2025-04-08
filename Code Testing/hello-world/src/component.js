//Component Example
import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

function Example(){
    const content = '<p>This is <strong>rich</strong> text.</p>';
    const clean = DOMPurify.sanitize(content);
    return(
        //<div dangerouslySetInnerHTML={{ __html: content }} />
        <div dangerouslySetInnerHTML={{ __html: clean }} />
    );
}

function MyForm() {
    const [htmlInput, setHtmlInput] = useState('');
    const [submittedHtml, setSubmittedHtml] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Sanitize the user input
      // const cleanHtml = DOMPurify.sanitize(htmlInput);
      // setSubmittedHtml(cleanHtml);


      setSubmittedHtml(htmlInput);  // Unsanitized


      // harmful inputs
      //<img src="x" onerror="alert('xss')" />
      //^^ This works because an error is thrown with an invalid src
      //<script>alert('tool')</script>
      //^^ This doesn't work because the browser is blocking it from being executed

    };
  
    return (
        <div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={htmlInput}
            onChange={(e) => setHtmlInput(e.target.value)}
            rows={4}
            cols={50}
          />
          <button type="submit">Render</button>
        </form>
  
        <h3>Output:</h3>
        <div dangerouslySetInnerHTML={{ __html: submittedHtml }} />
      </div>
    );
  }

function Hello() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try{
        const res = await fetch('http://localhost:8080/testing',{
          method: 'GET'
        })
        const data = await res.json();
        setData(data);
      } catch(err){
          console.log("no can do")
          const data = {testing: "<div><p>Something's up</p></div>"}
          setData(data)
        }
    }

    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Hello</h1>
      <div dangerouslySetInnerHTML={{ __html: data.testing }} />
    </div>
  );
}

function Goodbye() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try{
        const res = await fetch('http://localhost:8080/testing2',{
          method: 'GET'
        })
        const data = await res.json();
        setData(data);
      } catch(err){
          console.log("no can do")
          const data = {testing: "<div><p>Something's up</p></div>"}
          setData(data)
        }
    }

    loadData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Hello</h1>
      <div><b>{data.testing}</b></div>
    </div>
  );
}

function Vulns() {
    const content = "<strong>Hello World</strong>";
    Document.title = "My Website"
    console.dir(Document)

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
    //<strong>Hello</strong>
  );
  }
  

//export default Hello;
export { Hello, Goodbye, Vulns, MyForm, Example }
