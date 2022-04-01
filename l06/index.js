const express = require("express");
const bodyParser=require("body-parser");

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 8080;

const BASE_API_URL ="/api/v1";
const API_DOC_PORTAL="https://web.postman.co/documentation/19574612-1fb25e03-def7-468b-8fda-7a70fdffcc21/publish?workspaceId=073926f2-8af1-4c72-831d-56120a16e807";

var contacts= [
    {
        name: "peter",
        phone: 123456
    },
    {
        name: "paul",
        phone: 56789
    }
];


app.get(BASE_API_URL+"/docs",(req,res)=>{
    res.redirect(API_DOC_PORTAL);
});

app.get(BASE_API_URL+"/contacts",(req,res)=>{
    res.send(JSON.stringify(contacts,null,2));
});

app.get(BASE_API_URL+"/contacts/:name",(req,res)=>{
    var contactName= req.params.name;
    filteredContacts=contacts.filter((contact)=>{
        return (contact.name == contactName);
    });
    if(filteredContacts==0){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredContacts[0],null,2));
    }
});

app.post(BASE_API_URL+"/contacts",(req,res)=>{
    contacts.push(req.body);
    res.sendStatus(201,"CREATED");
});

app.delete(BASE_API_URL+"/contacts",(req,res)=>{
    contacts= [];
    res.sendStatus(200,"OK");
});

app.delete(BASE_API_URL+"/contacts/:name",(req,res)=>{
    var contactName= req.params.name;
    contacts=contacts.filter((contact)=>{
        return (contact.name != contactName);
    });
    res.sendStatus(200,"OK");
});


app.listen(port, () => {
    console.log(`Server ready at port ${port}`);
});
