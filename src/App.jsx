// PL OWNER SIMULATOR V3 — REAL PLAYERS
import { useState, useEffect, useCallback, useMemo } from "react";

const REAL_SQUADS = {
0:[["David Raya","GK",30,86,86,120,35,4],["Kepa","GK",31,78,78,80,12,3],["William Saliba","CB",24,88,92,150,90,5],["Gabriel","CB",28,85,85,130,55,5],["Piero Hincapié","CB",24,80,86,70,40,5],["Riccardo Calafiori","CB",23,80,87,75,42,4],["Cristhian Mosquera","CB",21,75,85,40,25,5],["Ben White","RB",28,84,84,120,50,4],["Jurriën Timber","RB",24,83,88,100,55,4],["Zinchenko","LB",29,80,80,100,28,2],["Myles Lewis-Skelly","LB",19,72,85,15,12,5],["Declan Rice","CM",27,89,90,200,100,4],["Martin Ødegaard","CAM",27,90,91,200,100,4],["Martin Zubimendi","CDM",27,86,87,130,65,4],["Mikel Merino","CM",29,82,82,90,35,3],["Ethan Nwaneri","CAM",18,72,90,25,18,5],["Christian Nørgaard","CDM",31,76,76,60,12,3],["Bukayo Saka","RW",24,90,93,200,120,5],["Noni Madueke","RW",23,82,87,90,50,4],["Gabriel Martinelli","LW",24,83,87,100,55,4],["Leandro Trossard","LW",31,81,81,100,25,2],["Eberechi Eze","CAM",27,83,85,90,48,4],["Viktor Gyökeres","ST",27,87,88,180,85,5],["Kai Havertz","ST",26,83,85,120,55,4],["Gabriel Jesus","ST",28,80,80,100,30,2]],
1:[["Ederson","GK",32,86,86,120,30,1],["Stefan Ortega","GK",33,78,78,50,8,2],["James Trafford","GK",23,74,84,40,18,4],["Rúben Dias","CB",29,87,87,150,65,3],["John Stones","CB",32,84,84,120,30,1],["Joško Gvardiol","CB",23,84,90,100,70,4],["Nathan Aké","CB",30,82,82,100,35,2],["Rico Lewis","RB",21,78,87,50,35,5],["Rayan Aït-Nouri","LB",24,82,87,80,45,4],["Rodri","CDM",29,91,91,200,100,4],["Bernardo Silva","CM",31,87,87,150,55,2],["Phil Foden","CAM",25,88,91,180,100,5],["Tijjani Reijnders","CM",27,84,87,100,55,4],["Mateo Kovačić","CM",31,82,82,100,25,1],["Jérémy Doku","LW",23,82,88,90,55,4],["Rayan Cherki","RW",22,80,88,70,45,4],["Savinho","RW",21,79,87,60,40,5],["Erling Haaland","ST",25,93,95,250,180,5],["Omar Marmoush","ST",27,83,85,100,55,4],["Antoine Semenyo","ST",26,78,82,60,30,4]],
2:[["Alisson","GK",33,88,88,150,35,2],["Caoimhín Kelleher","GK",27,78,82,50,18,3],["Virgil van Dijk","CB",34,87,87,180,25,1],["Ibrahima Konaté","CB",26,85,88,100,60,4],["Jarell Quansah","CB",22,76,85,30,20,5],["Joe Gomez","CB",28,80,80,80,25,2],["Trent Alexander-Arnold","RB",27,87,88,150,80,4],["Andy Robertson","LB",31,82,82,100,20,2],["Kostas Tsimikas","LB",29,78,78,60,15,2],["Ryan Gravenberch","CM",23,83,88,80,55,5],["Alexis Mac Allister","CM",27,85,86,120,60,3],["Curtis Jones","CM",24,79,84,60,30,4],["Dominik Szoboszlai","CAM",25,82,87,80,50,4],["Mohamed Salah","RW",33,87,87,200,40,1],["Luis Díaz","LW",28,84,85,100,55,3],["Cody Gakpo","LW",26,82,86,80,50,4],["Darwin Núñez","ST",27,83,86,100,60,3],["Diogo Jota","ST",28,83,84,100,45,3]],
3:[["Robert Sánchez","GK",28,80,82,80,25,5],["Wesley Fofana","CB",25,82,87,80,50,5],["Levi Colwill","CB",22,80,87,60,40,5],["Marc Cucurella","LB",27,82,84,80,35,4],["Axel Disasi","CB",27,79,80,60,25,3],["Reece James","RB",26,83,86,100,45,4],["Malo Gusto","RB",22,80,86,50,35,5],["Moisés Caicedo","CDM",24,85,89,100,70,5],["Enzo Fernández","CM",25,84,88,100,65,5],["Romeo Lavia","CDM",21,78,87,50,35,5],["Cole Palmer","RW",23,87,92,120,100,6],["Pedro Neto","LW",25,82,86,80,45,4],["João Félix","CAM",26,80,84,80,35,3],["Nicolas Jackson","ST",25,80,85,70,40,5],["Christopher Nkunku","ST",28,83,84,100,45,3]],
4:[["André Onana","GK",29,83,83,100,30,4],["Matthijs de Ligt","CB",26,82,86,100,45,4],["Lisandro Martínez","CB",27,84,85,100,50,4],["Leny Yoro","CB",20,78,90,50,40,5],["Diogo Dalot","RB",26,82,84,80,35,4],["Noussair Mazraoui","RB",27,80,81,60,25,3],["Luke Shaw","LB",30,80,80,100,20,2],["Kobbie Mainoo","CM",21,80,89,50,45,5],["Manuel Ugarte","CDM",24,82,86,80,45,4],["Bruno Fernandes","CAM",31,86,86,180,45,2],["Marcus Rashford","LW",28,81,83,120,40,3],["Alejandro Garnacho","RW",21,79,87,50,40,5],["Amad Diallo","RW",23,80,86,60,40,5],["Rasmus Højlund","ST",22,79,88,60,45,5],["Joshua Zirkzee","ST",24,77,83,50,30,4]],
5:[["Nick Pope","GK",33,82,82,80,15,2],["Sven Botman","CB",25,82,86,70,45,4],["Fabian Schär","CB",34,78,78,60,5,1],["Lewis Hall","LB",21,76,84,40,25,5],["Kieran Trippier","RB",35,78,78,70,5,1],["Tino Livramento","RB",23,79,85,50,30,4],["Bruno Guimarães","CM",28,86,87,120,70,4],["Sandro Tonali","CM",25,83,87,80,55,4],["Joelinton","CM",29,80,80,80,30,3],["Alexander Isak","ST",26,87,89,150,90,5],["Anthony Gordon","LW",25,83,87,80,55,5],["Harvey Barnes","LW",27,79,81,60,25,3],["Miguel Almirón","RW",32,76,76,60,8,1]],
6:[["Guglielmo Vicario","GK",29,83,84,80,30,4],["Cristian Romero","CB",27,85,87,100,55,4],["Micky van de Ven","CB",24,84,89,80,60,5],["Pedro Porro","RB",26,83,85,80,45,4],["Destiny Udogie","LB",23,81,87,60,40,5],["Yves Bissouma","CDM",29,80,80,80,25,3],["James Maddison","CAM",29,82,82,100,30,2],["Pape Matar Sarr","CM",22,78,85,40,30,5],["Dejan Kulusevski","RW",25,83,87,80,50,4],["Son Heung-min","LW",33,84,84,150,25,1],["Brennan Johnson","RW",24,78,83,50,30,4],["Dominic Solanke","ST",28,80,81,80,30,3],["Richarlison","ST",29,79,79,80,20,2]],
7:[["Emiliano Martínez","GK",33,87,87,120,30,3],["Ezri Konsa","CB",28,82,83,80,35,3],["Pau Torres","CB",28,83,84,80,40,3],["Tyrone Mings","CB",32,77,77,60,8,1],["Matty Cash","RB",28,79,80,60,20,3],["Lucas Digne","LB",32,78,78,70,8,1],["Ian Maatsen","LB",23,78,84,50,30,4],["John McGinn","CM",31,81,81,100,22,2],["Youri Tielemans","CM",29,82,82,80,30,3],["Boubacar Kamara","CDM",25,81,84,60,35,4],["Amadou Onana","CDM",24,80,86,60,40,4],["Morgan Rogers","RW",23,79,85,40,30,5],["Jadon Sancho","LW",26,80,83,80,30,3],["Ollie Watkins","ST",30,84,84,100,40,3],["Jhon Durán","ST",22,78,86,40,35,5]],
8:[["Bart Verbruggen","GK",23,79,86,40,22,5],["Lewis Dunk","CB",34,79,79,60,8,1],["Jan Paul van Hecke","CB",25,79,83,40,25,4],["Ferdi Kadıoğlu","RB",25,80,84,50,35,4],["Pervis Estupiñán","LB",27,80,81,60,25,3],["Mats Wieffer","CDM",26,80,83,50,30,4],["Kaoru Mitoma","LW",28,82,83,80,40,3],["Georginio Rutter","RW",23,78,84,40,28,4],["João Pedro","ST",24,80,84,50,30,4],["Evan Ferguson","ST",21,77,88,40,35,5],["Danny Welbeck","ST",35,74,74,40,3,1]],
9:[["Alphonse Areola","GK",32,78,78,60,10,2],["Max Kilman","CB",28,79,80,60,22,4],["Jean-Clair Todibo","CB",25,80,84,60,30,4],["Kurt Zouma","CB",31,78,78,70,10,1],["Aaron Wan-Bissaka","RB",28,77,77,60,12,2],["Emerson","LB",31,76,76,50,5,1],["Lucas Paquetá","CAM",28,82,83,80,35,3],["Tomáš Souček","CDM",30,80,80,70,20,2],["Edson Álvarez","CDM",27,81,82,60,25,3],["Mohammed Kudus","RW",25,82,86,60,45,4],["Jarrod Bowen","RW",29,81,81,80,30,3],["Crysencio Summerville","LW",24,79,84,40,30,4],["Niclas Füllkrug","ST",32,79,79,80,15,2]],
10:[["Djordje Petrović","GK",25,78,83,40,18,4],["Marcos Senesi","CB",28,78,79,50,15,3],["Illia Zabarnyi","CB",23,79,85,40,28,4],["Alex Scott","RB",22,76,84,30,18,5],["Adrien Truffert","LB",23,77,83,35,20,4],["Tyler Adams","CM",27,79,80,50,18,3],["Lewis Cook","CM",28,77,77,40,10,2],["Justin Kluivert","LW",26,79,81,50,22,3],["Dango Ouattara","RW",23,77,83,35,22,4],["Evanilson","ST",26,79,83,50,25,4],["Antoine Semenyo","ST",26,78,82,50,28,3]],
11:[["Dean Henderson","GK",28,78,79,50,15,3],["Marc Guéhi","CB",25,82,86,60,45,4],["Joachim Andersen","CB",29,80,80,60,20,3],["Tyrick Mitchell","LB",25,78,81,40,20,4],["Daniel Muñoz","RB",29,79,80,50,18,3],["Adam Wharton","CM",21,80,88,40,40,5],["Cheick Doucouré","CDM",25,79,82,40,25,4],["Michael Olise","RW",23,84,89,80,60,5],["Yeremy Pino","RW",23,80,86,50,35,4],["Jean-Philippe Mateta","ST",27,80,81,50,25,3],["Odsonne Édouard","ST",27,76,77,40,10,2]],
12:[["Bernd Leno","GK",33,81,81,60,10,2],["Calvin Bassey","CB",25,79,83,50,25,4],["Issa Diop","CB",28,77,77,50,12,2],["Antonee Robinson","LB",28,80,81,50,22,3],["Kenny Tete","RB",29,77,77,40,8,2],["Andreas Pereira","CAM",30,79,79,60,12,2],["Sasa Lukić","CM",29,78,78,40,12,2],["Emile Smith Rowe","CAM",25,79,84,50,28,4],["Alex Iwobi","RW",29,77,77,50,12,2],["Harry Wilson","LW",28,77,78,40,10,2],["Rodrigo Muniz","ST",24,79,84,40,28,4]],
13:[["José Sá","GK",32,80,80,50,12,2],["Santiago Bueno","CB",25,76,80,25,12,4],["Nélson Semedo","RB",32,78,78,60,8,1],["Hugo Bueno","LB",22,75,82,25,12,5],["João Gomes","CM",24,80,85,50,30,4],["Mario Lemina","CM",31,78,78,50,10,1],["Matheus Cunha","CAM",27,83,85,80,45,3],["Pedro Neto","LW",25,82,86,60,45,3],["Hwang Hee-chan","ST",29,78,78,40,15,2],["Jorgen Strand Larsen","ST",25,79,83,40,28,4]],
14:[["Mark Flekken","GK",32,78,78,40,8,2],["Ethan Pinnock","CB",32,78,78,40,8,1],["Nathan Collins","CB",24,79,84,40,22,4],["Sepp van den Berg","CB",24,78,83,35,20,4],["Aaron Hickey","RB",23,77,83,35,18,4],["Rico Henry","LB",28,77,79,35,10,2],["Vitaly Janelt","CM",27,77,78,35,12,3],["Mathias Jensen","CM",29,77,77,30,8,2],["Bryan Mbeumo","RW",26,82,84,60,35,3],["Yoane Wissa","ST",29,80,80,40,22,2],["Ivan Toney","ST",29,82,82,80,35,2],["Kevin Schade","LW",24,77,82,30,15,4]],
15:[["Jordan Pickford","GK",32,82,82,60,18,3],["James Tarkowski","CB",33,79,79,50,8,1],["Jarrad Branthwaite","CB",23,80,87,40,35,5],["Vitalii Mykolenko","LB",26,77,79,35,12,3],["Nathan Patterson","RB",24,75,80,25,10,3],["Abdoulaye Doucouré","CM",32,77,77,50,8,1],["Dwight McNeil","LW",26,78,80,30,15,3],["Iliman Ndiaye","CAM",25,78,83,30,20,4],["Dominic Calvert-Lewin","ST",28,78,79,60,18,2],["Beto","ST",27,76,79,40,12,3]],
16:[["Matz Sels","GK",33,80,80,40,10,2],["Murillo","CB",23,80,86,40,30,4],["Nikola Milenković","CB",27,79,80,50,18,3],["Neco Williams","RB",24,78,82,35,18,4],["Ola Aina","LB",29,77,77,30,8,2],["Danilo","CDM",24,78,84,30,22,4],["Ibrahim Sangaré","CDM",27,79,81,40,18,3],["Morgan Gibbs-White","CAM",25,80,84,40,30,4],["Anthony Elanga","LW",23,77,83,30,18,4],["Callum Hudson-Odoi","RW",25,78,82,35,18,3],["Chris Wood","ST",34,78,78,50,5,1]],
17:[["Illan Meslier","GK",25,78,83,35,18,4],["Pascal Struijk","CB",26,78,81,30,15,3],["Joe Rodon","CB",27,77,80,25,12,3],["Junior Firpo","LB",29,76,76,30,5,1],["Archie Gray","RB",19,75,87,20,20,5],["Ethan Ampadu","CDM",25,78,82,30,15,3],["Ilia Gruev","CM",24,76,81,20,10,4],["Willy Gnonto","RW",22,77,85,25,20,5],["Crysencio Summerville","LW",24,79,84,30,25,3],["Brenden Aaronson","CAM",25,76,80,25,10,3],["Georginio Rutter","ST",23,78,84,30,22,3],["Joel Piroe","ST",26,77,79,25,12,3]],
18:[["James Trafford","GK",23,74,84,25,15,4],["Dara O'Shea","CB",26,77,81,25,12,3],["Jordan Beyer","CB",25,76,80,20,10,3],["Vitinho","RB",25,75,78,15,5,2],["Ian Maatsen","LB",23,78,84,30,25,3],["Josh Brownhill","CM",29,77,77,25,8,2],["Sander Berge","CM",27,78,80,30,12,3],["Hannibal Mejbri","CM",22,73,80,12,6,3],["Wilson Odobert","LW",20,75,84,15,15,5],["Luca Koleosho","RW",19,74,84,12,12,5],["Zeki Amdouni","ST",24,76,82,20,12,4]],
19:[["Robin Roefs","GK",25,78,83,25,15,4],["Dan Ballard","CB",25,77,82,20,12,4],["Dennis Cirkin","LB",23,76,82,15,10,4],["Trai Hume","RB",23,75,81,12,8,4],["Chris Rigg","CM",18,74,88,15,15,5],["Dan Neil","CM",23,76,81,15,8,4],["Jobe Bellingham","CM",20,75,85,15,12,5],["Jack Clarke","LW",25,78,82,25,18,3],["Romaine Mundle","LW",22,74,81,10,6,4],["Wilson Isidor","ST",24,76,81,15,10,4],["Eliezer Mayenda","ST",20,73,82,8,6,5]],
};


const CLUBS=[
{id:0,name:"Arsenal",short:"ARS",color:"#EF0107",accent:"#063672",cap:60704,rep:90,budget:180,mgr:"Mikel Arteta"},
{id:1,name:"Man City",short:"MCI",color:"#6CABDD",accent:"#1C2C5B",cap:53400,rep:95,budget:250,mgr:"Pep Guardiola"},
{id:2,name:"Liverpool",short:"LIV",color:"#C8102E",accent:"#00B2A9",cap:61276,rep:92,budget:170,mgr:"Arne Slot"},
{id:3,name:"Chelsea",short:"CHE",color:"#034694",accent:"#DBA111",cap:40834,rep:85,budget:200,mgr:"Enzo Maresca"},
{id:4,name:"Man United",short:"MUN",color:"#DA291C",accent:"#FBE122",cap:74310,rep:88,budget:190,mgr:"Rúben Amorim"},
{id:5,name:"Newcastle",short:"NEW",color:"#241F20",accent:"#ccc",cap:52305,rep:78,budget:130,mgr:"Eddie Howe"},
{id:6,name:"Tottenham",short:"TOT",color:"#132257",accent:"#ccc",cap:62850,rep:80,budget:140,mgr:"Ange Postecoglou"},
{id:7,name:"Aston Villa",short:"AVL",color:"#670E36",accent:"#95BFE5",cap:42788,rep:72,budget:100,mgr:"Unai Emery"},
{id:8,name:"Brighton",short:"BHA",color:"#0057B8",accent:"#FFCD00",cap:31800,rep:68,budget:80,mgr:"Fabian Hürzeler"},
{id:9,name:"West Ham",short:"WHU",color:"#7A263A",accent:"#1BB1E7",cap:62500,rep:70,budget:90,mgr:"Nuno Espírito Santo"},
{id:10,name:"Bournemouth",short:"BOU",color:"#DA291C",accent:"#000",cap:11364,rep:55,budget:50,mgr:"Andoni Iraola"},
{id:11,name:"Crystal Palace",short:"CRY",color:"#1B458F",accent:"#C4122E",cap:25486,rep:62,budget:60,mgr:"Oliver Glasner"},
{id:12,name:"Fulham",short:"FUL",color:"#000000",accent:"#CC0000",cap:25700,rep:60,budget:60,mgr:"Marco Silva"},
{id:13,name:"Wolves",short:"WOL",color:"#FDB913",accent:"#231F20",cap:31750,rep:62,budget:60,mgr:"Vítor Pereira"},
{id:14,name:"Brentford",short:"BRE",color:"#E30613",accent:"#FBB800",cap:17250,rep:58,budget:55,mgr:"Thomas Frank"},
{id:15,name:"Everton",short:"EVE",color:"#003399",accent:"#ccc",cap:52888,rep:65,budget:50,mgr:"David Moyes"},
{id:16,name:"Nott'm Forest",short:"NFO",color:"#DD0000",accent:"#ccc",cap:30445,rep:55,budget:50,mgr:"Sean Dyche"},
{id:17,name:"Leeds United",short:"LEE",color:"#FFCD00",accent:"#1D428A",cap:37890,rep:65,budget:55,mgr:"Daniel Farke"},
{id:18,name:"Burnley",short:"BUR",color:"#6C1D45",accent:"#99D6EA",cap:21944,rep:50,budget:40,mgr:"Scott Parker"},
{id:19,name:"Sunderland",short:"SUN",color:"#FF0000",accent:"#000",cap:49000,rep:55,budget:40,mgr:"Régis Le Bris"},
];
const FORMATIONS={"4-3-3":{slots:["GK","LB","CB","CB","RB","CM","CM","CAM","LW","RW","ST"]},"4-4-2":{slots:["GK","LB","CB","CB","RB","LW","CM","CM","RW","ST","ST"]},"3-5-2":{slots:["GK","CB","CB","CB","LB","CM","CDM","CM","RB","ST","ST"]},"4-2-3-1":{slots:["GK","LB","CB","CB","RB","CDM","CDM","LW","CAM","RW","ST"]},"5-3-2":{slots:["GK","LB","CB","CB","CB","RB","CM","CM","CM","ST","ST"]},"3-4-3":{slots:["GK","CB","CB","CB","LB","CM","CM","RB","LW","RW","ST"]},"4-1-4-1":{slots:["GK","LB","CB","CB","RB","CDM","LW","CM","CM","RW","ST"]},"4-3-2-1":{slots:["GK","LB","CB","CB","RB","CM","CM","CM","CAM","CAM","ST"]}};
const PC={GK:["GK"],CB:["CB"],LB:["LB","RB"],RB:["RB","LB"],CDM:["CDM","CM"],CM:["CM","CDM","CAM"],CAM:["CAM","CM"],LW:["LW","RW"],RW:["RW","LW"],ST:["ST","CAM"]};
const INJ=[{n:"Hamstring strain",a:2,b:6},{n:"Ankle sprain",a:1,b:4},{n:"Knee ligament",a:4,b:20},{n:"Muscle fatigue",a:1,b:2},{n:"Groin strain",a:2,b:5},{n:"ACL tear",a:20,b:38},{n:"Calf injury",a:2,b:4}];
const canPlaySlot=(p,slot)=>(PC[slot]||[slot]).includes(p.pos);

let _pid=1;
function buildPlayer(d,cid){const[name,pos,age,ovr,pot,wage,value,cy]=d;return{id:_pid++,name,pos,age,ovr,pot,wage,value,contractYears:cy,clubId:cid,morale:65+Math.floor(Math.random()*25),fitness:85+Math.floor(Math.random()*15),form:60+Math.floor(Math.random()*30),goals:0,assists:0,apps:0,injured:false,injWeeks:0,suspended:false,releaseClause:Math.round(value*(1.5+Math.random())),sigBonus:0,loyBonus:Math.round(wage*0.1)};}
function buildSquads(){_pid=1;const s={};Object.entries(REAL_SQUADS).forEach(([c,ps])=>{s[Number(c)]=ps.map(p=>buildPlayer(p,Number(c)));});return s;}
function genFix(ids){const n=ids.length,f=[],l=[...ids];for(let r=0;r<(n-1)*2;r++){const w=r+1,h=r<n-1?0:1,ri=r%(n-1);const p=[l[0]];for(let i=1;i<n;i++)p.push(l[1+((ri+i-1)%(n-1))]);for(let i=0;i<n/2;i++){const hm=h===0?p[i]:p[n-1-i],aw=h===0?p[n-1-i]:p[i];if(hm!==aw)f.push({week:w,home:hm,away:aw,played:false,hg:0,ag:0});}}return f;}

// ═══ MATCH ENGINE V3 (xG + POISSON + GAME STATE) ═══
const ATK_POS=["ST","LW","RW","CAM"];
const MID_POS=["CM","CDM","CAM"];
const DEF_POS=["CB","LB","RB"];
const FORM_BONUS={"4-3-3":{atk:3,mid:0,def:0},"4-4-2":{atk:1,mid:2,def:0},"3-5-2":{atk:0,mid:4,def:-1},"4-2-3-1":{atk:1,mid:3,def:1},"5-3-2":{atk:-2,mid:1,def:4},"3-4-3":{atk:4,mid:1,def:-2},"4-1-4-1":{atk:-1,mid:3,def:2},"4-3-2-1":{atk:2,mid:2,def:0}};
const FORM_COUNTERS={"4-3-3":{"4-4-2":2,"5-3-2":3},"4-4-2":{"3-5-2":3,"4-2-3-1":2},"3-5-2":{"4-3-3":2},"4-2-3-1":{"4-3-3":2,"4-4-2":1,"3-4-3":2},"5-3-2":{"4-4-2":2,"4-2-3-1":3},"3-4-3":{"5-3-2":3,"4-4-2":2},"4-1-4-1":{"3-4-3":3,"4-3-3":1},"4-3-2-1":{"4-1-4-1":2,"3-5-2":2}};
const DEFAULT_TACTICS={tempo:50,width:50,press:50,line:50};
const clampN=(n,min,max)=>Math.max(min,Math.min(max,n));

function formationTactics(form){
  const t={
    "4-3-3":{tempo:56,width:62,press:58,line:55},
    "4-4-2":{tempo:52,width:55,press:50,line:48},
    "3-5-2":{tempo:53,width:57,press:54,line:52},
    "4-2-3-1":{tempo:55,width:58,press:56,line:53},
    "5-3-2":{tempo:46,width:49,press:47,line:44},
    "3-4-3":{tempo:60,width:64,press:60,line:58},
    "4-1-4-1":{tempo:50,width:54,press:53,line:50},
    "4-3-2-1":{tempo:54,width:46,press:55,line:52},
  };
  return t[form]||DEFAULT_TACTICS;
}

function normTactics(style,form){
  const base=formationTactics(form);
  const s=style||{};
  return{
    tempo:clampN(Number.isFinite(s.tempo)?s.tempo:base.tempo,20,80),
    width:clampN(Number.isFinite(s.width)?s.width:base.width,20,80),
    press:clampN(Number.isFinite(s.press)?s.press:base.press,20,80),
    line:clampN(Number.isFinite(s.line)?s.line:base.line,20,80),
  };
}

function aiMatchTactics(rep=70,form="4-3-3"){
  const b=formationTactics(form);
  const tilt=(rep-70)*0.22;
  return{
    tempo:Math.round(clampN(b.tempo+tilt+Math.random()*8-4,28,76)),
    width:Math.round(clampN(b.width+Math.random()*8-4,28,76)),
    press:Math.round(clampN(b.press+tilt*0.6+Math.random()*8-4,28,78)),
    line:Math.round(clampN(b.line+tilt*0.4+Math.random()*8-4,24,76)),
  };
}

function analyzeSquad(squad,formation){
  const fit=squad.filter(p=>!p.injured);
  const xi=fit.sort((a,b)=>b.ovr-a.ovr).slice(0,11);
  if(xi.length<7)return{atk:40,mid:40,def:40,gk:40,xi,attackers:[],midfielders:[],defenders:[],keeper:null,penTakers:[],setPieceThreat:45};
  const fb=FORM_BONUS[formation]||{atk:0,mid:0,def:0};
  const attackers=xi.filter(p=>ATK_POS.includes(p.pos));
  const midfielders=xi.filter(p=>MID_POS.includes(p.pos)&&!ATK_POS.includes(p.pos));
  const defenders=xi.filter(p=>DEF_POS.includes(p.pos));
  const keeper=xi.find(p=>p.pos==="GK");
  const unitStr=(players)=>{if(!players.length)return 55;return players.reduce((s,p)=>s+p.ovr*(0.7+p.form*0.002+p.fitness*0.001),0)/players.length;};
  const penTakers=[...xi].sort((a,b)=>{
    const pa=(a.pos==="ST"?8:a.pos==="CAM"?6:a.pos==="RW"||a.pos==="LW"?5:a.pos==="CM"?3:1)+a.ovr*0.1;
    const pb=(b.pos==="ST"?8:b.pos==="CAM"?6:b.pos==="RW"||b.pos==="LW"?5:b.pos==="CM"?3:1)+b.ovr*0.1;
    return pb-pa;
  });
  const setPieceThreat=defenders.reduce((s,p)=>s+p.ovr,0)/Math.max(1,defenders.length);
  return{
    atk:unitStr(attackers)+fb.atk,
    mid:unitStr(midfielders)+fb.mid,
    def:unitStr(defenders)+fb.def,
    gk:keeper?(keeper.ovr*(0.7+keeper.form*0.002)):50,
    xi,attackers,midfielders,defenders,keeper,penTakers,setPieceThreat,
  };
}

function weightedPick(pool){
  if(!pool.length)return null;
  const total=pool.reduce((s,x)=>s+Math.max(0,x.w||0),0);
  if(total<=0)return pool[Math.floor(Math.random()*pool.length)]?.p||null;
  let roll=Math.random()*total;
  for(const x of pool){
    roll-=Math.max(0,x.w||0);
    if(roll<=0)return x.p;
  }
  return pool[0]?.p||null;
}

function poisson(lambda){
  const l=Math.exp(-Math.max(0,lambda));
  let k=0,p=1;
  do{k++;p*=Math.random();}while(p>l);
  return k-1;
}

function pickScorer(team,mode="open"){
  const players=team.xi.filter(Boolean);
  const pool=players.map(p=>{
    let base=1;
    if(mode==="pen")base=p.pos==="ST"?6:p.pos==="CAM"?4:p.pos==="RW"||p.pos==="LW"?3:1;
    else if(mode==="setpiece")base=p.pos==="CB"?3.3:p.pos==="ST"?2.8:p.pos==="CM"?1.6:p.pos==="LB"||p.pos==="RB"?1.2:1;
    else base=p.pos==="ST"?4.2:p.pos==="RW"||p.pos==="LW"?2.6:p.pos==="CAM"?2.4:p.pos==="CM"?1.2:p.pos==="LB"||p.pos==="RB"?0.9:p.pos==="CB"?0.45:0.2;
    return{p,w:base*Math.max(60,p.ovr)};
  });
  return weightedPick(pool);
}

function pickAssister(team,scorer,mode="open"){
  const players=team.xi.filter(p=>p&&p.id!==scorer?.id);
  const pool=players.map(p=>{
    let base=1;
    if(mode==="setpiece")base=p.pos==="CAM"?2:p.pos==="CM"?1.8:p.pos==="LB"||p.pos==="RB"?1.5:1;
    else if(mode==="pen")base=0.5;
    else base=p.pos==="CAM"?3.2:p.pos==="RW"||p.pos==="LW"?2.4:p.pos==="LB"||p.pos==="RB"?2:p.pos==="CM"?1.5:0.8;
    return{p,w:base*Math.max(55,p.ovr)};
  });
  return weightedPick(pool);
}

function stateMultiplier(goalDiff,isHome,minute){
  if(goalDiff===0){
    if(minute>=75)return 1.07;
    return 1;
  }
  const trailing=isHome?goalDiff<0:goalDiff>0;
  const by=Math.abs(goalDiff);
  if(trailing)return by>=2?(minute>=70?1.34:1.24):(minute>=70?1.24:1.14);
  return by>=2?0.76:0.86;
}

function buildXGProfile(team,opp,teamForm,oppForm,teamStyle,oppStyle,isHome){
  const counter=(FORM_COUNTERS[teamForm]||{})[oppForm]||0;
  const homeBoost=isHome?0.13:0;
  const style=normTactics(teamStyle,teamForm);
  const oppS=normTactics(oppStyle,oppForm);
  let open=1.03+homeBoost+(team.atk-opp.def)*0.025+(team.mid-opp.mid)*0.009+counter*0.06;
  open+=(style.tempo-50)*0.004+(style.width-50)*0.0018+(style.press-50)*0.0015+(style.line-50)*0.0013;
  open+=(oppS.line-50)*0.0017+(oppS.press-50)*0.0011;
  open-=(opp.gk-80)*0.0085; // stronger GK impact
  open=clampN(open,0.35,2.35);
  let setPiece=0.14+counter*0.02+(style.width-50)*0.0013+(style.press-50)*0.0011+(team.setPieceThreat-opp.def)*0.002;
  setPiece=clampN(setPiece,0.08,0.58);
  let penRate=0.05+(style.tempo-50)*0.0009+(style.press-50)*0.0006;
  penRate=clampN(penRate,0.02,0.12);
  const total=open+setPiece+penRate*0.76;
  const shotQuality=clampN(0.095+(team.atk-opp.def)*0.0008-(opp.gk-80)*0.0005,0.06,0.18);
  const shots=clampN(total/shotQuality,6,20);
  return{open,setPiece,penRate,total,shots,style,counter};
}

function simulateMatchCore(homeSquad,awaySquad,homeForm,awayForm,homeStyle,awayStyle,withEvents=true){
  const hForm=homeForm||"4-3-3";
  const aForm=awayForm||"4-3-3";
  const h=analyzeSquad(homeSquad,hForm);
  const a=analyzeSquad(awaySquad,aForm);
  const hProfile=buildXGProfile(h,a,hForm,aForm,homeStyle,awayStyle,true);
  const aProfile=buildXGProfile(a,h,aForm,hForm,awayStyle,homeStyle,false);
  const hVar=0.92+Math.random()*0.16;
  const aVar=0.92+Math.random()*0.16;
  let hg=0,ag=0,hReds=0,aReds=0;
  const events=[];
  const pushEvent=(m,type,team,text,scorer,assister)=>{if(withEvents)events.push({m,type,team,text,scorer,assister});};
  const redBase=0.005+(hProfile.style.press+aProfile.style.press-100)*0.00005;

  for(let c=0;c<6;c++){
    const m0=c*15+1,m1=Math.min(90,(c+1)*15),mMid=Math.floor((m0+m1)/2);
    if(withEvents&&Math.random()<redBase){hReds++;const off=weightedPick([...h.defenders,...h.midfielders,...h.attackers].map(p=>({p,w:p.pos==="CB"||p.pos==="CDM"?1.6:1})));pushEvent(m0+Math.floor(Math.random()*6),"red","home",`🟥 ${m0}' RED CARD! ${off?.name||"Player"} sent off!`);}
    if(withEvents&&Math.random()<redBase){aReds++;const off=weightedPick([...a.defenders,...a.midfielders,...a.attackers].map(p=>({p,w:p.pos==="CB"||p.pos==="CDM"?1.6:1})));pushEvent(m0+Math.floor(Math.random()*6),"red","away",`🟥 ${m0}' RED CARD! ${off?.name||"Player"} sent off!`);}

    const diff=hg-ag;
    const hState=stateMultiplier(diff,true,mMid),aState=stateMultiplier(diff,false,mMid);
    const hRedMult=Math.pow(0.82,hReds)*Math.pow(1.08,aReds);
    const aRedMult=Math.pow(0.82,aReds)*Math.pow(1.08,hReds);
    const hFatigue=c>=4?0.94:c>=3?0.97:1;
    const aFatigue=c>=4?0.94:c>=3?0.97:1;

    const hOpenL=clampN((hProfile.open/6)*hState*hRedMult*hVar*hFatigue,0.01,1.25);
    const aOpenL=clampN((aProfile.open/6)*aState*aRedMult*aVar*aFatigue,0.01,1.25);
    const hSetL=clampN((hProfile.setPiece/6)*hState*hRedMult*hVar,0,0.45);
    const aSetL=clampN((aProfile.setPiece/6)*aState*aRedMult*aVar,0,0.45);
    const hOpenG=poisson(hOpenL),aOpenG=poisson(aOpenL);
    const hSetG=poisson(hSetL),aSetG=poisson(aSetL);
    const hPenChance=clampN((hProfile.penRate/6)*hState*hRedMult,0,0.22);
    const aPenChance=clampN((aProfile.penRate/6)*aState*aRedMult,0,0.22);
    const hPen=Math.random()<hPenChance?(Math.random()<0.78?1:0):0;
    const aPen=Math.random()<aPenChance?(Math.random()<0.78?1:0):0;

    const hChunkGoals=hOpenG+hSetG+hPen;
    const aChunkGoals=aOpenG+aSetG+aPen;
    const hShots=poisson(clampN((hProfile.shots/6)*hState*hRedMult*(0.9+Math.random()*0.2),0.8,7));
    const aShots=poisson(clampN((aProfile.shots/6)*aState*aRedMult*(0.9+Math.random()*0.2),0.8,7));
    const hOnTarget=Math.max(0,Math.round(hShots*clampN(0.33+(h.atk-a.def)*0.0018,0.24,0.52)));
    const aOnTarget=Math.max(0,Math.round(aShots*clampN(0.33+(a.atk-h.def)*0.0018,0.24,0.52)));
    const hSaves=Math.max(0,hOnTarget-hChunkGoals);
    const aSaves=Math.max(0,aOnTarget-aChunkGoals);

    let hRun=hg,aRun=ag;
    const logGoals=(count,teamName,mode,isHomeTeam)=>{
      for(let i=0;i<count;i++){
        const minute=m0+Math.floor(Math.random()*(m1-m0+1));
        const t=isHomeTeam?h:a;
        const scorer=pickScorer(t,mode);
        const assister=mode==="pen"||Math.random()<0.27?null:pickAssister(t,scorer,mode);
        if(isHomeTeam)hRun++;else aRun++;
        const icon=mode==="setpiece"?"🎯":mode==="pen"?"🎯":"⚽";
        const txt=assister?`${icon} ${minute}' GOAL! ${scorer?.name||"Unknown"} (assist: ${assister.name}) [${hRun}-${aRun}]`:`${icon} ${minute}' GOAL! ${scorer?.name||"Unknown"} [${hRun}-${aRun}]`;
        pushEvent(minute,"goal",teamName,txt,scorer?.name,assister?.name);
      }
    };

    logGoals(hOpenG,"home","open",true);
    logGoals(hSetG,"home","setpiece",true);
    logGoals(hPen,"home","pen",true);
    logGoals(aOpenG,"away","open",false);
    logGoals(aSetG,"away","setpiece",false);
    logGoals(aPen,"away","pen",false);
    hg=hRun;ag=aRun;

    if(withEvents&&hSaves>0&&Math.random()<0.75)pushEvent(m0+Math.floor(Math.random()*8),"save","home",`🧤 ${m0}' ${a.keeper?.name||"Keeper"} makes a save`);
    if(withEvents&&aSaves>0&&Math.random()<0.75)pushEvent(m0+Math.floor(Math.random()*8),"save","away",`🧤 ${m0}' ${h.keeper?.name||"Keeper"} saves well`);
    if(withEvents&&Math.random()<0.2){
      const isH=Math.random()<0.5;const fouler=weightedPick([...(isH?h.midfielders:a.midfielders),...(isH?h.defenders:a.defenders)].map(p=>({p,w:p.pos==="CDM"||p.pos==="CB"?1.4:1})));
      pushEvent(m0+Math.floor(Math.random()*10),"yellow",isH?"home":"away",`🟨 ${m0}' Yellow card — ${fouler?.name||"Player"}`);
    }
    if(withEvents&&Math.random()<0.09){
      const isH=Math.random()<0.5;const p=weightedPick([...(isH?h.attackers:a.attackers),...(isH?h.midfielders:a.midfielders),...(isH?h.defenders:a.defenders)].map(x=>({p:x,w:1})));
      pushEvent(m0+Math.floor(Math.random()*10),"injury",isH?"home":"away",`🏥 ${m0}' ${p?.name||"Player"} is down receiving treatment`);
    }
    if(withEvents&&Math.random()<0.08)pushEvent(m0+Math.floor(Math.random()*10),"var",Math.random()<0.5?"home":"away",`📺 ${m0}' VAR check in progress...`);
    if(withEvents&&Math.random()<0.16)pushEvent(m0+Math.floor(Math.random()*10),"corner",Math.random()<0.5?"home":"away",`🚩 ${m0}' Corner kick`);
    if(withEvents&&c===2)pushEvent(45,"half","none",`🕐 HALF TIME: ${hg}-${ag}`);
  }

  if(withEvents){
    events.sort((x,y)=>x.m-y.m);
    events.push({m:90,type:"full",team:"none",text:`🏁 FULL TIME: ${hg}-${ag}`});
  }
  return{homeGoals:hg,awayGoals:ag,events,homeAnalysis:h,awayAnalysis:a,homeXG:round2(hProfile.total),awayXG:round2(aProfile.total)};
}

function simMatchV2(homeSquad,awaySquad,homeForm,awayForm,homeStyle,awayStyle){
  return simulateMatchCore(homeSquad,awaySquad,homeForm,awayForm,homeStyle,awayStyle,true);
}

function quickSim(hSquad,aSquad,hForm="4-3-3",aForm="4-3-3",hStyle=null,aStyle=null){
  const r=simulateMatchCore(hSquad,aSquad,hForm,aForm,hStyle,aStyle,false);
  return{hg:r.homeGoals,ag:r.awayGoals};
}

function genTarget(budget,filterPos){const pos=filterPos||["GK","CB","LB","RB","CDM","CM","CAM","LW","RW","ST"][Math.floor(Math.random()*10)];const isE=budget>120&&Math.random()<0.25;const base=isE?82:Math.random()<0.4?74:65;const ovr=Math.max(55,Math.min(92,base+Math.floor(Math.random()*10)-4));const age=isE?24+Math.floor(Math.random()*5):19+Math.floor(Math.random()*12);const pot=Math.min(95,ovr+Math.max(0,(28-age)*1.2)+Math.floor(Math.random()*4));
const ageValueMult=age<=23?1.18:age<=28?1.08:age<=31?0.95:0.78;
const ageWageBonus=age<=23?6:age<=29?10:age<=32?4:-6;
const value=Math.round(clamp(((ovr-58)*(ovr-58)*0.055*ageValueMult)+((pot-ovr)*0.9)+(Math.random()*4),2,170));
const wage=Math.round(clamp(((ovr-52)*(ovr-52)*0.09)+((pot-ovr)*2)+ageWageBonus+(Math.random()*14-3),6,320));
const names=["Sergio Reguilón","Jesse Lingard","Memphis Depay","Thomas Lemar","Saúl Ñíguez","André Gomes","Giovani Lo Celso","Tanguy Ndombélé","Steven Bergwijn","Yannick Carrasco","Diego Costa","Willian","Oscar","Cenk Tosun","Danny Drinkwater","Loris Karius","Phil Jones","Dele Alli","Wissam Ben Yedder"];
return{id:_pid++,name:names[Math.floor(Math.random()*names.length)],pos,age,ovr,pot,wage,value,askPrice:Math.round(clamp(value*(0.95+Math.random()*0.4),2,220)),agentWage:Math.round(clamp(wage*(1.02+Math.random()*0.16),6,380)),sellOn:Math.floor(Math.random()*16)+5,sigBonus:Math.round(wage*(3+Math.random()*8)),scout:["Hidden gem","Solid pro","High ceiling","Injury prone","Leader","Raw talent"][Math.floor(Math.random()*6)],willing:Math.random()<0.65,morale:70,fitness:90,form:65,goals:0,assists:0,apps:0,injured:false,injWeeks:0,suspended:false,contractYears:0,clubId:-1,releaseClause:Math.round(value*2),loyBonus:0};}

function devPlayers(sq){return sq.map(p=>{let o=p.ovr;if(p.age<24&&o<p.pot){o=Math.min(p.pot,o+(Math.random()<0.6?Math.floor(Math.random()*3)+1:0));}else if(p.age>=30&&p.age<33){o=Math.random()<0.4?Math.max(60,o-1):o;}else if(p.age>=33){o=Math.random()<0.6?Math.max(55,o-Math.floor(Math.random()*2+1)):o;}const v=Math.max(1,Math.round((o-50)*(o-50)*0.14+(p.pot-o)*1.2));return{...p,age:p.age+1,ovr:o,value:v,goals:0,assists:0,apps:0,form:55+Math.floor(Math.random()*30),contractYears:Math.max(0,p.contractYears-1)};});}

function aiTransfers(sq,clubs){const ns={...sq};clubs.forEach(c=>{const s=[...(ns[c.id]||[])];const kept=s.filter(p=>!(p.age>33&&p.wage>40)||(p.contractYears>0&&Math.random()>0.3));const pc={};kept.forEach(p=>{pc[p.pos]=(pc[p.pos]||0)+1;});["GK","CB","LB","RB","CM","CAM","LW","RW","ST"].forEach(pos=>{if((pc[pos]||0)<2&&Math.random()<0.5){const t=c.rep>=85?"elite":c.rep>=70?"good":"avg";const b=t==="elite"?80:t==="good"?72:64;const o=b+Math.floor(Math.random()*8)-2;const a=20+Math.floor(Math.random()*8);const fn=["Marcus","James","Oliver","Lucas","Mohammed","Leo","Pedro","Mateo","Enzo","Florian","Joshua","William","Gabriel","Kai","Bruno","Victor","Liam","Noah"][Math.floor(Math.random()*18)];const ln=["Silva","Santos","Johnson","Williams","Garcia","Martinez","Rodriguez","Wilson","Taylor","Thomas","White","Harris","Martin","King","Wright","Hill","Green","Adams","Baker"][Math.floor(Math.random()*19)];kept.push({id:_pid++,name:`${fn} ${ln}`,pos,age:a,ovr:o,pot:Math.min(95,o+Math.max(0,(28-a))+3),wage:Math.round(o*o*0.07),value:Math.round((o-50)*(o-50)*0.14),contractYears:3+Math.floor(Math.random()*3),clubId:c.id,morale:70,fitness:90,form:65,goals:0,assists:0,apps:0,injured:false,injWeeks:0,suspended:false,releaseClause:999,sigBonus:0,loyBonus:0});}});ns[c.id]=kept;});return ns;}

function saveGame(s){try{localStorage.setItem("pl-v3",JSON.stringify(s));return true;}catch(e){return false;}}
function loadGame(){try{const r=localStorage.getItem("pl-v3");return r?JSON.parse(r):null;}catch(e){return null;}}
function delSave(){try{localStorage.removeItem("pl-v3");}catch(e){}}
const round2=(n)=>Math.round(n*100)/100;
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const pick=(arr)=>arr[Math.floor(Math.random()*arr.length)];
const fmtInt=(n)=>Math.round(Number(n)||0).toLocaleString("en-US");
const fmtK=(k)=>`$${fmtInt(k)}K`;
const fmtM=(m)=>`$${Number(m).toFixed(Number(m)>=10?1:2)}M`;
const fmtBonus=(k)=>Number(k)>=1000?fmtM(Number(k)/1000):fmtK(k);
const MOJIBAKE_RE=/[ÃÂâ€]/;

function normalizeText(v){
  if(typeof v!=="string")return"";
  let out=v;
  if(MOJIBAKE_RE.test(out)){
    try{
      const bytes=Uint8Array.from(Array.from(out).map(ch=>ch.charCodeAt(0)&255));
      out=new TextDecoder("utf-8").decode(bytes);
    }catch(e){}
  }
  return out.replace(/[\u0000-\u001f]+/g," ").replace(/\s+/g," ").trim();
}

function normalizeNewsEntries(list){
  return(Array.isArray(list)?list:[]).map(n=>{
    const icon=normalizeText(n?.icon||"NEWS");
    const text=normalizeText(n?.text||"");
    const safeIcon=MOJIBAKE_RE.test(icon)||!icon?"NEWS":icon.slice(0,10);
    return{icon:safeIcon,text};
  }).filter(n=>n.text);
}

function cashflow(g,label,amount){
  if(!Number.isFinite(amount)||Math.abs(amount)<0.00001)return;
  g.budget=round2((g.budget||0)+amount);
  if(amount>0)g.sInc=round2((g.sInc||0)+amount);
  else g.sExp=round2((g.sExp||0)+Math.abs(amount));
  g.financeLog=[{season:g.season,wk:g.wk,label,amount:round2(amount)},...(g.financeLog||[])].slice(0,40);
}

function getLeagueTable(fixtures){
  return CLUBS.map(c=>{
    const pl=fixtures.filter(f=>f.played&&(f.home===c.id||f.away===c.id));
    let pts=0,gf=0,ga=0;
    pl.forEach(f=>{
      const isH=f.home===c.id;
      const fg=isH?f.hg:f.ag;
      const ag=isH?f.ag:f.hg;
      gf+=fg;ga+=ag;
      if(fg>ag)pts+=3;
      else if(fg===ag)pts+=1;
    });
    return{id:c.id,pts,gd:gf-ga,gf};
  }).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
}

function getTablePosition(fixtures,pid){
  return getLeagueTable(fixtures).findIndex(t=>t.id===pid)+1;
}

function weeklyStaffCost(staff){
  const s=staff||{recruitment:1,medical:1,analytics:1};
  return round2((s.recruitment+s.medical+s.analytics)*0.045);
}

function weeklyAcademyCost(academy){
  const tier=academy?.tier||1;
  return round2(0.04+tier*0.035);
}

function weeklyAmortization(book){
  return round2((book||[]).reduce((sum,c)=>sum+((c.annualAmort||0)/52),0));
}

function calcAttendanceRate(g){
  return clamp(0.58+(g.fan||60)*0.003+(45-(g.ticketPrice||45))*0.009,0.45,1.02);
}

function createSponsorOffer(g){
  const brands=["Apex","Vertex","Nova","Titan","Orbit","Summit","Meridian","Vantage","Atlas"];
  const tiers=[
    {name:"Regional",mult:0.75,weeks:10},
    {name:"National",mult:1,weeks:12},
    {name:"Global",mult:1.3,weeks:14},
  ];
  const score=(g.rep||60)+(g.fan||60)*0.35+(g.comm||45)*0.4;
  const tier=score>140?tiers[2]:score>115?tiers[1]:tiers[0];
  const weekly=round2((0.18+(g.comm||40)*0.004+(g.rep||60)*0.0025)*(tier.mult)*(0.9+Math.random()*0.25));
  const upfront=round2(weekly*(3+Math.random()*2.5));
  return{
    id:Date.now()+Math.floor(Math.random()*100000),
    name:`${pick(brands)} ${tier.name}`,
    weekly,
    upfront,
    weeks:tier.weeks+Math.floor(Math.random()*4),
    tier:tier.name,
  };
}

function createAcademyPlayer(clubId,tier){
  const first=["Luca","Noah","Ethan","Aiden","Mason","Leo","Kai","Jay","Finn","Oscar","Isaac","Callum"];
  const last=["Smith","Taylor","Brown","Walker","Evans","Mills","Hughes","Bennett","Parker","Reed","Ward","Cole"];
  const pos=pick(["CB","LB","RB","CDM","CM","CAM","LW","RW","ST","GK"]);
  const age=16+Math.floor(Math.random()*3);
  const ovr=58+tier*2+Math.floor(Math.random()*7);
  const pot=Math.min(94,ovr+8+Math.floor(Math.random()*12));
  const wage=Math.max(2,Math.round(ovr*0.35+tier*0.8));
  const value=Math.max(1,Math.round((ovr-48)*(ovr-48)*0.09));
  return{
    id:_pid++,
    name:`${pick(first)} ${pick(last)}`,
    pos,age,ovr,pot,wage,value,contractYears:3,clubId,
    morale:72,fitness:88,form:62,goals:0,assists:0,apps:0,
    injured:false,injWeeks:0,suspended:false,releaseClause:Math.round(value*2.2),
    sigBonus:0,loyBonus:Math.round(wage*0.05),
  };
}

function migrateGame(raw){
  if(!raw)return null;
  const g={...raw};
  g.news=normalizeNewsEntries(g.news);
  g.form=g.form||"4-3-3";
  g.tactics=normTactics(g.tactics,g.form);
  g.capAdj=Number.isFinite(g.capAdj)?g.capAdj:0;
  g.ticketPrice=Number.isFinite(g.ticketPrice)?g.ticketPrice:45;
  const currentWages=(g.sq?.[g.pid]||[]).reduce((s,p)=>s+(p.wage||0),0)*0.001;
  g.wageBudget=Number.isFinite(g.wageBudget)?g.wageBudget:round2(Math.max(0.8,currentWages*1.1));
  g.financeLog=Array.isArray(g.financeLog)?g.financeLog:[];
  g.sponsor=g.sponsor&&typeof g.sponsor==="object"?g.sponsor:null;
  if(g.sponsor&&!Number.isFinite(g.sponsor.weeksLeft))g.sponsor.weeksLeft=Number.isFinite(g.sponsor.weeks)?g.sponsor.weeks:12;
  g.sponsorOffers=Array.isArray(g.sponsorOffers)?g.sponsorOffers:[];
  g.payables=Array.isArray(g.payables)?g.payables:[];
  g.receivables=Array.isArray(g.receivables)?g.receivables:[];
  g.contractBook=Array.isArray(g.contractBook)?g.contractBook:[];
  g.wageDemands=Array.isArray(g.wageDemands)?g.wageDemands:[];
  g.staff={recruitment:Math.max(1,g.staff?.recruitment||1),medical:Math.max(1,g.staff?.medical||1),analytics:Math.max(1,g.staff?.analytics||1)};
  g.academy={tier:Math.max(1,g.academy?.tier||1),focus:g.academy?.focus||"Local",lastGraduateWeek:Number.isFinite(g.academy?.lastGraduateWeek)?g.academy.lastGraduateWeek:0};
  const targetPos=Math.max(4,Math.min(16,Math.round(22-(g.rep||60)/5)));
  g.board={patience:clamp(g.board?.patience??72,0,100),targetPos:g.board?.targetPos||targetPos,lastReviewWeek:Number.isFinite(g.board?.lastReviewWeek)?g.board.lastReviewWeek:0};
  g.stadiumProject=g.stadiumProject||null;
  g.log=Array.isArray(g.log)?g.log:[];
  g.txDone=Array.isArray(g.txDone)?g.txDone:[];
  g.sInc=Number.isFinite(g.sInc)?g.sInc:0;
  g.sExp=Number.isFinite(g.sExp)?g.sExp:0;
  return g;
}
const fonts=`@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');`;
const S={page:{minHeight:"100vh",background:"linear-gradient(160deg,#080c14 0%,#0f1629 50%,#0a1020 100%)",fontFamily:"'Inter',sans-serif",color:"#e2e8f0"},btn:(c,sz="md")=>({background:`linear-gradient(135deg,${c},${c}bb)`,color:"#fff",border:"none",padding:sz==="sm"?"5px 12px":sz==="lg"?"12px 32px":"8px 18px",fontSize:sz==="sm"?10:sz==="lg"?15:12,fontFamily:"'Oswald',sans-serif",letterSpacing:sz==="sm"?1:2,borderRadius:5,cursor:"pointer",textTransform:"uppercase"}),ghost:{background:"transparent",border:"1px solid rgba(255,255,255,0.12)",color:"#94a3b8",padding:"5px 12px",fontSize:10,fontFamily:"'Oswald',sans-serif",letterSpacing:1,borderRadius:5,cursor:"pointer"},card:{background:"rgba(255,255,255,0.025)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:8,padding:12},label:{fontSize:10,letterSpacing:3,color:"#475569",fontFamily:"'Oswald',sans-serif",marginBottom:6,display:"block",textTransform:"uppercase"},tab:(a,c)=>({padding:"7px 14px",fontSize:11,fontFamily:"'Oswald',sans-serif",letterSpacing:1.5,background:a?`${c}18`:"transparent",color:a?"#e2e8f0":"#64748b",border:"none",borderBottom:a?`2px solid ${c}`:"2px solid transparent",cursor:"pointer",textTransform:"uppercase"})};

function Bar({label,value,max=100,color="#38bdf8",icon,small}){const p=Math.min(100,Math.max(0,(value/max)*100));return(<div style={{marginBottom:small?3:6}}><div style={{display:"flex",justifyContent:"space-between",fontSize:small?8:9,fontFamily:"'Oswald',sans-serif",letterSpacing:1.5,color:"#64748b",marginBottom:2}}><span>{icon} {label}</span><span style={{color:p<25?"#ef4444":"#cbd5e1",fontFamily:"'JetBrains Mono',monospace",fontSize:small?9:10}}>{Math.round(value)}</span></div><div style={{height:small?3:4,background:"#1e293b",borderRadius:2,overflow:"hidden"}}><div style={{width:`${p}%`,height:"100%",background:p<25?"linear-gradient(90deg,#ef4444,#f97316)":`linear-gradient(90deg,${color},${color}77)`,borderRadius:2,transition:"width 0.4s"}}/></div></div>);}

function PRow({p,compact,onClick,selected,color="#38bdf8"}){const oc=p.ovr>=85?"#10b981":p.ovr>=78?"#38bdf8":p.ovr>=70?"#eab308":"#94a3b8";return(<div onClick={onClick} style={{display:"grid",gridTemplateColumns:compact?"36px 1fr 28px":"30px 36px 1fr 28px 28px 48px",alignItems:"center",gap:4,padding:"5px 8px",fontSize:11,background:selected?`${color}12`:"transparent",borderLeft:selected?`2px solid ${color}`:"2px solid transparent",borderBottom:"1px solid rgba(255,255,255,0.03)",cursor:onClick?"pointer":"default"}}>{!compact&&<span style={{fontSize:9,color:"#475569",fontFamily:"'JetBrains Mono',monospace"}}>{p.pos}</span>}<span style={{width:compact?26:28,height:compact?26:28,borderRadius:"50%",background:`${oc}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:compact?10:11,fontWeight:700,color:oc,fontFamily:"'JetBrains Mono',monospace",border:`1px solid ${oc}33`}}>{p.ovr}</span><div style={{overflow:"hidden"}}><div style={{fontSize:compact?10:11,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{p.name}{p.injured?" 🏥":""}</div>{!compact&&<div style={{fontSize:9,color:"#475569"}}>{p.age}y{p.contractYears<=1?" ⚠️":""}</div>}</div>{compact&&<span style={{fontSize:8,color:"#475569"}}>{p.pos}</span>}{!compact&&<span style={{fontSize:9,color:"#64748b"}}>{p.age}</span>}{!compact&&<span style={{fontSize:9,color:p.fitness>80?"#10b981":p.fitness>50?"#eab308":"#ef4444"}}>{p.injured?"🏥":p.fitness+"%"}</span>}{!compact&&<span style={{fontSize:9,color:"#64748b",fontFamily:"'JetBrains Mono',monospace"}}>${p.wage}K</span>}</div>);}

function MEvent({ev}){const bg={goal:"rgba(16,185,129,0.1)",red:"rgba(239,68,68,0.1)",yellow:"rgba(234,179,8,0.06)",half:"rgba(99,102,241,0.06)",full:"rgba(168,85,247,0.1)"};return(<div style={{padding:"4px 8px",fontSize:11,background:bg[ev.type]||"transparent",borderRadius:3,marginBottom:2,color:ev.type==="goal"?"#10b981":ev.type==="red"?"#ef4444":ev.type==="full"||ev.type==="half"?"#a78bfa":"#94a3b8",fontWeight:ev.type==="goal"||ev.type==="full"?700:400}}>{ev.text}</div>);}

function Table({clubs,fixtures,pid}){const t=clubs.map(c=>{const pl=fixtures.filter(f=>f.played&&(f.home===c.id||f.away===c.id));let pts=0,w=0,d=0,l=0,gf=0,ga=0;pl.forEach(f=>{const isH=f.home===c.id;const fg=isH?f.hg:f.ag;const ag2=isH?f.ag:f.hg;gf+=fg;ga+=ag2;if(fg>ag2){w++;pts+=3;}else if(fg===ag2){d++;pts+=1;}else l++;});return{...c,p:pl.length,w,d,l,gf,ga,gd:gf-ga,pts};}).sort((a,b)=>b.pts-a.pts||b.gd-a.gd||b.gf-a.gf);
return(<div><div style={{display:"grid",gridTemplateColumns:"22px 1fr 22px 22px 22px 22px 30px 34px",gap:2,fontSize:9,color:"#475569",padding:"3px 6px",fontFamily:"'Oswald',sans-serif",letterSpacing:1}}><span>#</span><span>CLUB</span><span>P</span><span>W</span><span>D</span><span>L</span><span>GD</span><span>PTS</span></div>{t.map((c,i)=>(<div key={c.id} style={{display:"grid",gridTemplateColumns:"22px 1fr 22px 22px 22px 22px 30px 34px",gap:2,padding:"4px 6px",fontSize:10,fontFamily:"'JetBrains Mono',monospace",background:c.id===pid?`${c.color}12`:i%2===0?"rgba(255,255,255,0.015)":"transparent",borderLeft:c.id===pid?`2px solid ${c.color}`:"2px solid transparent",color:i<4?"#10b981":i<6?"#38bdf8":i>=17?"#ef4444":"#94a3b8"}}><span style={{color:"#475569"}}>{i+1}</span><span style={{fontFamily:"'Inter',sans-serif",fontWeight:c.id===pid?700:400,fontSize:10,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.short}</span><span>{c.p}</span><span>{c.w}</span><span>{c.d}</span><span>{c.l}</span><span style={{color:c.gd>0?"#10b981":c.gd<0?"#ef4444":"#64748b"}}>{c.gd>0?"+":""}{c.gd}</span><span style={{fontWeight:700,color:"#e2e8f0"}}>{c.pts}</span></div>))}<div style={{marginTop:6,fontSize:9,color:"#334155",display:"flex",gap:10,padding:"0 6px"}}><span><span style={{color:"#10b981"}}>●</span> UCL</span><span><span style={{color:"#38bdf8"}}>●</span> UEL</span><span><span style={{color:"#ef4444"}}>●</span> Rel</span></div></div>);}

// PITCH FORMATION VISUAL
const FORM_LAYOUT={
"4-3-3":[{r:92,c:50},{r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},{r:55,c:38},{r:55,c:62},{r:40,c:50},{r:24,c:14},{r:24,c:86},{r:14,c:50}],
"4-4-2":[{r:92,c:50},{r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},{r:52,c:12},{r:52,c:40},{r:52,c:60},{r:52,c:88},{r:20,c:42},{r:20,c:58}],
"3-5-2":[{r:92,c:50},{r:79,c:34},{r:81,c:50},{r:79,c:66},{r:60,c:10},{r:52,c:40},{r:58,c:50},{r:52,c:60},{r:60,c:90},{r:20,c:42},{r:20,c:58}],
"4-2-3-1":[{r:92,c:50},{r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},{r:60,c:42},{r:60,c:58},{r:36,c:14},{r:38,c:50},{r:36,c:86},{r:14,c:50}],
"5-3-2":[{r:92,c:50},{r:78,c:8},{r:81,c:30},{r:82,c:50},{r:81,c:70},{r:78,c:92},{r:54,c:38},{r:57,c:50},{r:54,c:62},{r:20,c:42},{r:20,c:58}],
"3-4-3":[{r:92,c:50},{r:79,c:34},{r:81,c:50},{r:79,c:66},{r:60,c:10},{r:54,c:42},{r:54,c:58},{r:60,c:90},{r:24,c:14},{r:24,c:86},{r:14,c:50}],
"4-1-4-1":[{r:92,c:50},{r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},{r:60,c:50},{r:44,c:12},{r:48,c:40},{r:48,c:60},{r:44,c:88},{r:14,c:50}],
"4-3-2-1":[{r:92,c:50},{r:76,c:12},{r:79,c:40},{r:79,c:60},{r:76,c:88},{r:54,c:36},{r:56,c:50},{r:54,c:64},{r:38,c:42},{r:38,c:58},{r:14,c:50}],
};

function Pitch({xi,formation,color}){const layout=FORM_LAYOUT[formation]||FORM_LAYOUT["4-3-3"];
return(<div style={{position:"relative",width:"100%",paddingTop:"140%",background:"linear-gradient(180deg,#1a6e2e 0%,#1f7a34 15%,#1a6e2e 30%,#1f7a34 45%,#1a6e2e 60%,#1f7a34 75%,#1a6e2e 90%,#1f7a34 100%)",borderRadius:10,overflow:"hidden",border:"2px solid #2d8b40"}}>
{/* Field lines */}
<div style={{position:"absolute",inset:0}}>
<div style={{position:"absolute",top:"0%",left:"50%",transform:"translateX(-50%)",width:"40%",height:"16%",border:"2px solid rgba(255,255,255,0.25)",borderTop:"none",borderRadius:"0 0 8px 8px"}}/>
<div style={{position:"absolute",bottom:"0%",left:"50%",transform:"translateX(-50%)",width:"40%",height:"16%",border:"2px solid rgba(255,255,255,0.25)",borderBottom:"none",borderRadius:"8px 8px 0 0"}}/>
<div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:60,height:60,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.25)"}}/>
<div style={{position:"absolute",top:"50%",left:0,right:0,height:0,borderTop:"2px solid rgba(255,255,255,0.25)"}}/>
</div>
{/* Players */}
{layout.map((pos,i)=>{const p=xi[i];if(!p||!pos)return null;const oc=p.ovr>=85?"#10b981":p.ovr>=78?"#38bdf8":p.ovr>=70?"#eab308":"#fff";
return(<div key={p.id} style={{position:"absolute",top:`${pos.r}%`,left:`${pos.c}%`,transform:"translate(-50%,-50%)",textAlign:"center",zIndex:2}}>
<div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${color||"#EF0107"},${color||"#EF0107"}aa)`,border:`2px solid ${oc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:"#fff",margin:"0 auto",boxShadow:"0 2px 8px rgba(0,0,0,0.4)"}}>{p.ovr}</div>
<div style={{fontSize:9,fontWeight:700,color:"#fff",textShadow:"0 1px 3px rgba(0,0,0,0.8)",marginTop:2,whiteSpace:"nowrap",fontFamily:"'Oswald',sans-serif",letterSpacing:0.5}}>{p.name.split(" ").pop()?.toUpperCase()}</div>
<div style={{fontSize:7,color:"rgba(255,255,255,0.6)",fontFamily:"'JetBrains Mono',monospace"}}>{p.pos}</div>
</div>);})}
</div>);}

export default function PLV3(){
  const [screen,setScreen]=useState("loading");
  const [game,setGame]=useState(null);
  const [tab,setTab]=useState("overview");
  const [matchView,setMatchView]=useState(null);
  const [targets,setTargets]=useState([]);
  const [selP,setSelP]=useState(null);
  const [nego,setNego]=useState(null);
  const [form,setForm]=useState("4-3-3");
  const [saveMsg,setSaveMsg]=useState("");
  const [decision,setDecision]=useState(null);
  const [selClub,setSelClub]=useState(null);
  const [news,setNews]=useState([]);
  const [scoutPos,setScoutPos]=useState("ALL");
  const [swapFrom,setSwapFrom]=useState(null); // player id to swap OUT of XI
  const [manualXI,setManualXI]=useState(null); // array of player IDs if manually set, or null for auto

  useEffect(()=>{(()=>{
    const s=migrateGame(loadGame());
    if(s){setGame(s);setForm(s.form||"4-3-3");setNews(s.news||[]);setScreen("game");}
    else setScreen("title");
  })();},[]);
  useEffect(()=>{if(game&&screen==="game"){const t=setTimeout(()=>saveGame({...game,form,news:normalizeNewsEntries(news)}),3000);return()=>clearTimeout(t);}},[game,form,screen,news]);

  const mc=game?CLUBS.find(c=>c.id===game.pid):null;
  const ms=game?game.sq[game.pid]||[]:[];
  const cc=mc?.color||"#38bdf8";
  const clubCap=(mc?.cap||0)+(game?.capAdj||0);
  const wf=useMemo(()=>game?game.fix.filter(f=>f.week===game.wk):[],[game?.wk,game?.fix]);
  const mm=useMemo(()=>wf.find(f=>f.home===game?.pid||f.away===game?.pid),[wf,game?.pid]);
  const wageBillM=useMemo(()=>round2(ms.reduce((s,p)=>s+p.wage,0)*0.001),[ms]);
  const staffCostM=useMemo(()=>weeklyStaffCost(game?.staff),[game?.staff]);
  const academyCostM=useMemo(()=>weeklyAcademyCost(game?.academy),[game?.academy]);
  const amortCostM=useMemo(()=>weeklyAmortization(game?.contractBook),[game?.contractBook]);
  const runRateM=useMemo(()=>{
    const flow=(game?.financeLog||[]).slice(0,8);
    if(!flow.length)return 0;
    return round2(flow.reduce((s,x)=>s+(x.amount||0),0)/flow.length);
  },[game?.financeLog]);

  const getXI=useCallback(()=>{
    if(!game)return[];
    const sq=[...ms].filter(p=>!p.injured&&!p.suspended);
    const slots=FORMATIONS[form]?.slots||FORMATIONS["4-3-3"].slots;
    const xi=Array(slots.length).fill(null);
    const used=new Set();
    const pickBest=(slot)=>{
      const natural=sq.filter(p=>!used.has(p.id)&&p.pos===slot);
      if(natural.length){
        natural.sort((a,b)=>b.ovr-a.ovr);
        return natural[0];
      }
      const compat=PC[slot]||[slot];
      const cands=sq.filter(p=>!used.has(p.id)&&compat.includes(p.pos));
      if(!cands.length)return null;
      cands.sort((a,b)=>b.ovr-a.ovr);
      return cands[0];
    };

    // Manual selections are unrestricted: user can place any player in any slot.
    if(manualXI&&manualXI.length){
      slots.forEach((slot,i)=>{
        const id=manualXI[i];
        if(!id)return;
        const p=sq.find(x=>x.id===id);
        if(p&&!used.has(p.id)){xi[i]=p;used.add(p.id);}
      });
    }

    slots.forEach((slot,i)=>{
      if(xi[i])return;
      const p=pickBest(slot);
      if(p){xi[i]=p;used.add(p.id);}
    });

    return xi;
  },[ms,form,game,manualXI]);

  // Handle substitution: swap a starter with a bench player
  const handleSub=(benchPlayer)=>{
    if(!swapFrom)return;
    const xi=getXI();
    const slotIndex=xi.findIndex(p=>p?.id===swapFrom);
    if(slotIndex<0)return;
    const newIds=xi.map(p=>p?.id||null);
    const existingIndex=newIds.findIndex(id=>id===benchPlayer.id);
    newIds[slotIndex]=benchPlayer.id;
    if(existingIndex>=0)newIds[existingIndex]=swapFrom;
    setManualXI(newIds);
    setSwapFrom(null);
  };
  // Reset to auto-pick
  const resetXI=()=>{setManualXI(null);setSwapFrom(null);};
  const setTacticValue=(key,val)=>{
    const v=Math.max(0,Math.min(100,Number(val)||0));
    setGame(g=>g?({...g,tactics:{...(g.tactics||DEFAULT_TACTICS),[key]:v}}):g);
  };
  const applyTacticPreset=(preset)=>{
    const presets={
      balanced:{tempo:50,width:50,press:50,line:50},
      attacking:{tempo:64,width:62,press:59,line:58},
      defensive:{tempo:42,width:44,press:46,line:42},
      counter:{tempo:55,width:52,press:52,line:46},
    };
    const next=presets[preset]||presets.balanced;
    setGame(g=>g?({...g,tactics:{...next}}):g);
  };

  const addNews=useCallback((items)=>{
    const queue=Array.isArray(items)?items:[items];
    setNews(prev=>normalizeNewsEntries([...queue,...prev]).slice(0,40));
  },[]);

  const initGame=(club)=>{
    const sq=buildSquads();
    const fix=genFix(CLUBS.map(c=>c.id));
    const fan=65+Math.floor(club.rep*0.2);
    const g={
      pid:club.id,season:1,wk:0,phase:"pre",budget:club.budget,sq,fix,
      fan,rep:club.rep,mgr:70,psr:15,comm:40+Math.floor(club.rep*0.3),
      mdRev:round2((club.cap*0.78*45)/1000000),spRev:Math.round(club.rep*0.4),
      tvRev:80+Math.floor(Math.random()*30),sExp:0,sInc:0,log:[],sr:[],form:"4-3-3",
      tactics:{...DEFAULT_TACTICS},
      txDone:[],over:false,overR:"",capAdj:0,ticketPrice:45,financeLog:[],
      payables:[],receivables:[],contractBook:[],wageDemands:[],
      staff:{recruitment:1,medical:1,analytics:1},
      academy:{tier:1,focus:"Local",lastGraduateWeek:0},
      board:{patience:72,targetPos:Math.max(4,Math.min(16,Math.round(22-club.rep/5))),lastReviewWeek:0},
      stadiumProject:null,sponsor:null,sponsorOffers:[],
    };
    const wages=(sq[club.id]||[]).reduce((s,p)=>s+p.wage,0)*0.001;
    g.wageBudget=round2(Math.max(0.8,wages*1.1));
    const openingSponsor=createSponsorOffer(g);
    g.sponsor={...openingSponsor,weeksLeft:openingSponsor.weeks};
    g.sponsorOffers=[createSponsorOffer(g),createSponsorOffer(g)];
    cashflow(g,`${openingSponsor.name} signing bonus`,openingSponsor.upfront);
    g.news=normalizeNewsEntries([
      {text:`Welcome to ${club.name}. Pre-season window open.`,icon:"NEWS"},
      {text:`Budget: $${club.budget}M. Weekly wage cap: $${g.wageBudget.toFixed(2)}M.`,icon:"FIN"},
      {text:`Initial sponsor signed: ${openingSponsor.name}.`,icon:"SPN"},
    ]);
    setGame(g);setForm("4-3-3");setScreen("game");setTab("overview");setNews(g.news);saveGame(g);
  };

  const playMatch=()=>{
    if(!mm||mm.played)return;
    const isH=mm.home===game.pid;
    const oid=isH?mm.away:mm.home;
    const oClub=CLUBS.find(c=>c.id===oid);
    const xi=getXI().filter(Boolean);
    const oSq=(game.sq[oid]||[]).filter(p=>!p.injured);
    const hSquad=isH?xi:oSq;
    const aSquad=isH?oSq:xi;
    const myStyle=normTactics(game.tactics,form);
    const aiStyle=aiMatchTactics(oClub?.rep||70,"4-3-3");
    const res=simMatchV2(
      hSquad,
      aSquad,
      isH?form:"4-3-3",
      isH?"4-3-3":form,
      isH?myStyle:aiStyle,
      isH?aiStyle:myStyle
    );
    const hg=res.homeGoals,ag=res.awayGoals;
    const myG=isH?hg:ag,thG=isH?ag:hg;
    const won=myG>thG,drew=myG===thG;
    const upd=game.fix.map(f=>{
      if(f===mm)return{...f,played:true,hg,ag};
      if(f.week===game.wk&&!f.played){
        const hClub=CLUBS.find(c=>c.id===f.home);
        const aClub=CLUBS.find(c=>c.id===f.away);
        const r2=quickSim(
          game.sq[f.home]||[],
          game.sq[f.away]||[],
          "4-3-3",
          "4-3-3",
          aiMatchTactics(hClub?.rep||70,"4-3-3"),
          aiMatchTactics(aClub?.rep||70,"4-3-3")
        );
        return{...f,played:true,hg:r2.hg,ag:r2.ag};
      }
      return f;
    });

    const g={...game,fix:upd};
    const ns={...g.sq};
    const uSq=[...ms];
    const myTeam=isH?"home":"away";
    const goalEvents=res.events.filter(e=>e.type==="goal"&&e.team===myTeam);
    const injuryChance=Math.max(0.015,0.045-(g.staff?.medical||1)*0.006);
    const injuryNews=[];
    xi.forEach(p=>{
      const i=uSq.findIndex(x=>x.id===p.id);
      if(i<0)return;
      const gls=goalEvents.filter(e=>e.scorer===p.name).length;
      const ast=goalEvents.filter(e=>e.assister===p.name).length;
      const u={...uSq[i],apps:uSq[i].apps+1,goals:uSq[i].goals+gls,assists:uSq[i].assists+ast,form:Math.max(30,Math.min(95,uSq[i].form+(won?3:drew?0:-3)+gls*3+ast*2+Math.floor(Math.random()*6-3)))};
      if(Math.random()<injuryChance){
        const inj=INJ[Math.floor(Math.random()*INJ.length)];
        const wks=inj.a+Math.floor(Math.random()*(inj.b-inj.a+1));
        u.injured=true;u.injWeeks=wks;u.fitness=30;
        injuryNews.push({text:`${p.name}: ${inj.n} (${wks} weeks).`,icon:"MED"});
      }
      uSq[i]=u;
    });
    ns[g.pid]=uSq;
    g.sq=ns;
    const myGoalScorers=goalEvents.map(e=>e.scorer).filter(Boolean);
    const scorerText=myGoalScorers.length>0?` (${myGoalScorers.join(", ")})`:"";

    const matchText=`${isH?mc.short:oClub.short} ${hg}-${ag} ${isH?oClub.short:mc.short}${scorerText}`;
    g.fan=clamp(g.fan+(won?5:drew?-1:-7),0,100);
    g.log=[{icon:won?"WIN":drew?"DRAW":"LOSS",text:matchText},...g.log].slice(0,120);

    if(isH){
      const gateRev=round2((clubCap*calcAttendanceRate(g)*(g.ticketPrice||45))/1000000);
      cashflow(g,"Matchday tickets",gateRev);
    }else{
      const oppCap=CLUBS.find(c=>c.id===oid)?.cap||45000;
      const awayShare=round2((oppCap*0.74*(g.ticketPrice||45))/1000000*0.08);
      cashflow(g,"Away revenue share",awayShare);
    }
    if(g.sponsor&&won)cashflow(g,"Sponsor performance bonus",round2(g.sponsor.weekly*0.3));

    setMatchView({res,isH,oClub,myG,thG});
    addNews([{text:`${won?"Win":drew?"Draw":"Loss"}: ${matchText}`,icon:won?"WIN":drew?"DRAW":"LOSS"},...injuryNews]);
    setGame(g);
  };

  const advance=()=>{
    if(!game)return;
    setMatchView(null);
    const g={...game};
    if(g.phase==="pre"){
      g.phase="season";g.wk=1;
      addNews({text:"Premier League season begins.",icon:"NEWS"});
      setGame(g);
      return;
    }

    g.wk+=1;
    const squad=g.sq[g.pid]||[];
    const weekWage=round2(squad.reduce((s,p)=>s+p.wage,0)*0.001);
    cashflow(g,"First-team wages",-weekWage);
    const overWage=Math.max(0,weekWage-(g.wageBudget||weekWage));
    if(overWage>0){
      g.psr=clamp(g.psr+overWage*0.9,0,100);
      g.board={...g.board,patience:clamp((g.board?.patience||70)-Math.ceil(overWage*5),0,100)};
      addNews({text:`Wage bill is over budget by $${overWage.toFixed(2)}M/wk.`,icon:"WARN"});
    }

    const staffCost=weeklyStaffCost(g.staff);
    const academyCost=weeklyAcademyCost(g.academy);
    const amort=weeklyAmortization(g.contractBook);
    cashflow(g,"Staff payroll",-staffCost);
    cashflow(g,"Youth academy",-academyCost);
    if(amort>0)cashflow(g,"Contract amortization",-amort);

    g.payables=(g.payables||[]).map(p=>{
      cashflow(g,p.label||"Transfer installment",-p.weekly);
      return{...p,weeksLeft:p.weeksLeft-1};
    }).filter(p=>p.weeksLeft>0);
    g.receivables=(g.receivables||[]).map(p=>{
      cashflow(g,p.label||"Transfer receivable",p.weekly);
      return{...p,weeksLeft:p.weeksLeft-1};
    }).filter(p=>p.weeksLeft>0);

    if(g.sponsor&&g.sponsor.weeksLeft>0){
      cashflow(g,`${g.sponsor.name} weekly`,g.sponsor.weekly);
      g.sponsor={...g.sponsor,weeksLeft:g.sponsor.weeksLeft-1};
      if(g.sponsor.weeksLeft<=0){
        g.sponsor=null;
        addNews({text:"Sponsor deal ended. Pick a new offer in Finances.",icon:"SPN"});
      }
    }
    if((!g.sponsor&&g.sponsorOffers.length===0)||g.wk%6===0){
      g.sponsorOffers=[createSponsorOffer(g),createSponsorOffer(g)];
      addNews({text:"New dynamic sponsorship offers available.",icon:"SPN"});
    }

    if(g.stadiumProject){
      cashflow(g,`Stadium project (${g.stadiumProject.kind})`,-g.stadiumProject.weeklyCost);
      g.stadiumProject={...g.stadiumProject,weeksLeft:g.stadiumProject.weeksLeft-1};
      if(g.stadiumProject.weeksLeft<=0){
        g.capAdj=(g.capAdj||0)+(g.stadiumProject.capGain||0);
        g.comm=clamp(g.comm+(g.stadiumProject.commGain||0),0,100);
        addNews({text:`Stadium project complete: ${g.stadiumProject.name}.`,icon:"FAC"});
        g.stadiumProject=null;
      }
    }

    g.contractBook=(g.contractBook||[]).map(c=>({...c,weeksLeft:(c.weeksLeft||0)-1})).filter(c=>c.weeksLeft>0);
    const refreshed=squad.map(p=>{
      if(p.injured){
        const w=p.injWeeks-1;
        return{...p,injured:w>0,injWeeks:Math.max(0,w),fitness:w<=0?70:p.fitness};
      }
      return{...p,fitness:Math.min(100,p.fitness+Math.floor(Math.random()*3)+1)};
    });
    g.sq={...g.sq,[g.pid]:refreshed};

    let expiredDemands=0;
    g.wageDemands=(g.wageDemands||[]).filter(d=>{
      if(g.wk>d.deadline){
        expiredDemands++;
        g.sq[g.pid]=g.sq[g.pid].map(p=>p.id===d.playerId?{...p,morale:Math.max(35,(p.morale||65)-8)}:p);
        return false;
      }
      return true;
    });
    if(expiredDemands>0){
      g.board={...g.board,patience:clamp((g.board?.patience||70)-expiredDemands*3,0,100)};
      addNews({text:`${expiredDemands} wage demand(s) expired. Dressing room mood dropped.`,icon:"WAGE"});
    }
    if((g.wageDemands||[]).length<3&&Math.random()<0.24){
      const cands=(g.sq[g.pid]||[]).filter(p=>p.contractYears<=2&&p.ovr>=76&&!p.injured);
      if(cands.length){
        const p=pick(cands);
        const demand={id:Date.now()+Math.floor(Math.random()*10000),playerId:p.id,name:p.name,current:p.wage,request:Math.round(p.wage*(1.08+Math.random()*0.2)),years:3+Math.floor(Math.random()*3),deadline:g.wk+2};
        g.wageDemands=[demand,...g.wageDemands].slice(0,5);
        addNews({text:`Wage demand: ${p.name} wants $${demand.request}K/wk for ${demand.years} years.`,icon:"WAGE"});
      }
    }

    if(g.wk%6===0){
      const pos=getTablePosition(g.fix,g.pid);
      const target=g.board?.targetPos||10;
      let delta=0;
      if(pos<=target-2)delta+=5;
      else if(pos>target+4)delta-=7;
      else if(pos>target+1)delta-=3;
      if(g.budget<0)delta-=4;
      if(g.psr>70)delta-=4;
      g.board={...g.board,patience:clamp((g.board?.patience||70)+delta,0,100),lastReviewWeek:g.wk};
      addNews({text:`Board review: position ${pos}, patience now ${g.board.patience}/100.`,icon:"BOARD"});
    }

    const gradInterval=Math.max(7,20-(g.academy?.tier||1)*3);
    if(g.wk-(g.academy?.lastGraduateWeek||0)>=gradInterval&&Math.random()<0.65){
      const kid=createAcademyPlayer(g.pid,g.academy?.tier||1);
      g.sq={...g.sq,[g.pid]:[...g.sq[g.pid],kid]};
      g.academy={...g.academy,lastGraduateWeek:g.wk};
      addNews({text:`Academy graduate promoted: ${kid.name} (${kid.pos} ${kid.ovr}/${kid.pot}).`,icon:"YTH"});
    }

    if(Math.random()<0.14){
      const shocks=[
        {label:"Insurance payout",amount:round2(1+Math.random()*3),text:"Insurance payout received after a training incident.",psr:-1},
        {label:"Tax adjustment",amount:round2(-(0.8+Math.random()*2.5)),text:"Unexpected tax adjustment hit the books.",psr:2},
        {label:"Merchandise surge",amount:round2(0.7+Math.random()*2),text:"Merchandise sales surged this week.",psr:-1},
        {label:"Legal settlement",amount:round2(-(1+Math.random()*3.2)),text:"Legal settlement paid this week.",psr:3},
      ];
      const ev=pick(shocks);
      cashflow(g,ev.label,ev.amount);
      g.psr=clamp(g.psr+(ev.psr||0),0,100);
      addNews({text:ev.text,icon:"FIN"});
    }

    if(g.wk>38){
      const tbl=getLeagueTable(g.fix);
      const pos=tbl.findIndex(t=>t.id===g.pid)+1;
      const myPts=tbl.find(t=>t.id===g.pid)?.pts||0;
      g.sr=[...g.sr,{s:g.season,pos,pts:myPts}];
      g.log=[{icon:"SEASON",text:`S${g.season}: ${pos}${pos===1?"st":pos===2?"nd":pos===3?"rd":"th"} (${myPts}pts)`},...g.log].slice(0,120);
      addNews({text:`Season ${g.season} complete. Finished ${pos}${pos<=3?["st","nd","rd"][pos-1]:"th"}.`,icon:"SEASON"});
      const leagueBonus=Math.max(0,(20-pos)*4);
      const sponsorBonus=g.sponsor?round2(g.sponsor.weekly*2.5):0;
      cashflow(g,"League prize + TV + sponsors",leagueBonus+g.tvRev+g.spRev+sponsorBonus);
      const loyalty=round2((g.sq[g.pid]||[]).reduce((s,p)=>s+(p.loyBonus||0),0)/1000);
      if(loyalty>0)cashflow(g,"Loyalty bonuses",-loyalty);
      if(pos>=18){g.over=true;g.overR=`Relegated in S${g.season}.`;}
      if((g.board?.patience||0)<=15&&!g.over){g.over=true;g.overR=`Board dismissed you in S${g.season}.`;}
      if(g.season>=6&&!g.over){g.over=true;g.overR="6 seasons complete!";}
      g.season+=1;g.wk=0;g.phase="pre";g.sExp=0;g.sInc=0;
      g.fix=genFix(CLUBS.map(c=>c.id));
      Object.keys(g.sq).forEach(cid=>{g.sq[cid]=devPlayers(g.sq[cid]);});
      g.sq=aiTransfers(g.sq,CLUBS.filter(c=>c.id!==g.pid));
      g.wageDemands=[];
      g.sponsorOffers=[createSponsorOffer(g),createSponsorOffer(g)];
      addNews({text:"Pre-season window open. Review finances and contracts.",icon:"NEWS"});
    }

    if(g.fan<=3){g.over=true;g.overR="Fan revolt!";}
    if(g.budget<=-120){g.over=true;g.overR="Administration!";}
    if(g.psr>=98){g.over=true;g.overR="PSR breach!";}
    if((g.board?.patience||0)<=8&&!g.over){g.over=true;g.overR="Board dismissed you.";}
    setGame(g);
  };

  const handleDec=(opt)=>{
    const g={...game};
    if(opt.e.budget)cashflow(g,"Board decision",opt.e.budget);
    if(opt.e.fan)g.fan=clamp(g.fan+opt.e.fan,0,100);
    if(opt.e.rep)g.rep=clamp(g.rep+opt.e.rep,0,100);
    g.log=[{icon:"BOARD",text:`Decision: ${opt.text}`},...g.log].slice(0,120);
    setGame(g);setDecision(null);
  };

  const openMkt=(filterPos)=>{
    const fp=filterPos&&filterPos!=="ALL"?filterPos:null;
    const scoutLvl=game?.staff?.recruitment||1;
    const list=Array.from({length:10},()=>{
      const t=genTarget(game.budget,fp);
      const boost=Math.floor(Math.random()*Math.max(1,scoutLvl));
      const ovr=clamp(t.ovr+boost,55,94);
      const pot=clamp(t.pot+boost,ovr,95);
      return{...t,ovr,pot,askPrice:Math.round(t.askPrice*(1+boost*0.04)),scout:`${t.scout}${boost>0?" + scouted":""}`};
    });
    setTargets(list);setTab("transfers");
  };

  const startNego=(p)=>{
    setNego({
      p,fee:Math.round(p.askPrice*0.8),wage:p.agentWage,sellOn:p.sellOn,sigBonus:p.sigBonus,
      years:4,agentFee:Math.round(p.askPrice*35),
      status:"open",rounds:0,
      msgs:[`Scout: ${p.scout}`,`Asking: ${fmtM(p.askPrice)}, ${fmtK(p.agentWage)}/wk, ${p.sellOn}% sell-on, ${fmtBonus(p.sigBonus)} sign bonus`],
    });
  };

  const submitOffer=()=>{
    if(!nego)return;
    const n={...nego,rounds:nego.rounds+1};
    const p=n.p;
    const fp=n.fee/p.askPrice;
    const wp=n.wage/p.agentWage;
    const contractOk=n.years>=3&&n.agentFee>=p.askPrice*20;
    if(!p.willing&&Math.random()>0.3){n.status="rejected";n.msgs=[...n.msgs,"Deal rejected: player not convinced by project."];}
    else if(fp>=0.9&&wp>=0.88&&contractOk){n.status="accepted";n.msgs=[...n.msgs,`Deal accepted: ${fmtM(n.fee)}, ${fmtK(n.wage)}/wk, ${n.years} years.`];}
    else if(n.rounds>=3){n.status="collapsed";n.msgs=[...n.msgs,"Talks collapsed."];}
    else{n.msgs=[...n.msgs,`Counter: improve ${fp<0.9?"fee ":""}${wp<0.88?"wage ":""}${!contractOk?"contract terms":""}.`.trim()];}
    setNego(n);
  };

  const completeTx=()=>{
    if(!nego||nego.status!=="accepted")return;
    const p={...nego.p,clubId:game.pid,wage:nego.wage,contractYears:nego.years,sigBonus:nego.sigBonus,loyBonus:Math.round(nego.wage*0.15)};
    const g={...game,sq:{...game.sq,[game.pid]:[...game.sq[game.pid],p]}};
    cashflow(g,"Transfer fee",-nego.fee);
    cashflow(g,"Signing bonus",-(nego.sigBonus/1000));
    cashflow(g,"Agent fee",-(nego.agentFee/1000));
    g.psr=Math.min(100,g.psr+nego.fee*0.12);
    g.contractBook=[{playerId:p.id,name:p.name,annualAmort:round2(nego.fee/Math.max(1,nego.years)),weeksLeft:nego.years*52},...(g.contractBook||[])].slice(0,80);
    g.txDone=[...g.txDone,{name:p.name,fee:nego.fee,type:"in"}];
    g.log=[{icon:"IN",text:`SIGNED: ${p.name} (${p.pos} ${p.ovr}) $${nego.fee}M`},...g.log].slice(0,120);
    addNews({text:`Done deal: ${p.name} joined for $${nego.fee}M.`,icon:"IN"});
    setGame(g);setNego(null);setTargets(prev=>prev.filter(t=>t.id!==nego.p.id));
  };

  const sellP=(p)=>{
    const fee=Math.round(p.value*(0.7+Math.random()*0.5));
    const upfront=round2(fee*0.7);
    const deferred=round2(fee-upfront);
    const g={...game,sq:{...game.sq,[game.pid]:game.sq[game.pid].filter(x=>x.id!==p.id)}};
    cashflow(g,"Player sale upfront",upfront);
    if(deferred>0.05){
      g.receivables=[{label:`${p.name} sale installments`,weekly:round2(deferred/12),weeksLeft:12},...(g.receivables||[])].slice(0,20);
    }
    g.psr=Math.max(0,g.psr-fee*0.08);
    g.contractBook=(g.contractBook||[]).filter(c=>c.playerId!==p.id);
    g.txDone=[...g.txDone,{name:p.name,fee,type:"out"}];
    g.log=[{icon:"OUT",text:`SOLD: ${p.name} $${fee}M`},...g.log].slice(0,120);
    addNews({text:`${p.name} sold for $${fee}M (${upfront}M now, ${deferred}M over 12w).`,icon:"OUT"});
    setGame(g);setSelP(null);
  };

  const acceptSponsorOffer=(offer)=>{
    const g={...game};
    g.sponsor={...offer,weeksLeft:offer.weeks};
    g.sponsorOffers=(g.sponsorOffers||[]).filter(o=>o.id!==offer.id);
    cashflow(g,`${offer.name} signing bonus`,offer.upfront);
    addNews({text:`Sponsor signed: ${offer.name} (${offer.tier}) for $${offer.weekly}M/wk.`,icon:"SPN"});
    setGame(g);
  };

  const resolveWageDemand=(d,accept)=>{
    const g={...game};
    g.wageDemands=(g.wageDemands||[]).filter(x=>x.id!==d.id);
    g.sq[g.pid]=g.sq[g.pid].map(p=>{
      if(p.id!==d.playerId)return p;
      if(accept){
        return{...p,wage:d.request,contractYears:d.years,morale:clamp((p.morale||65)+8,0,100)};
      }
      return{...p,morale:Math.max(35,(p.morale||65)-10)};
    });
    if(accept){
      g.board={...g.board,patience:clamp((g.board?.patience||70)+1,0,100)};
      addNews({text:`Contract renewed: ${d.name} now on ${fmtK(d.request)}/wk (${d.years}y).`,icon:"WAGE"});
    }else{
      g.board={...g.board,patience:clamp((g.board?.patience||70)-2,0,100)};
      addNews({text:`Wage demand rejected: ${d.name} is unhappy.`,icon:"WAGE"});
    }
    setGame(g);
  };

  const adjustTicket=(delta)=>{
    const g={...game,ticketPrice:clamp((game.ticketPrice||45)+delta,20,90)};
    setGame(g);
  };

  const adjustWageBudget=(delta)=>{
    const g={...game,wageBudget:round2(clamp((game.wageBudget||wageBillM)+delta,0.6,8.5))};
    setGame(g);
  };

  const upgradeStaff=(key)=>{
    const level=game?.staff?.[key]||1;
    const cost=round2(level*1.8);
    if(game.budget<cost)return;
    const g={...game,staff:{...game.staff,[key]:level+1}};
    cashflow(g,`Staff upgrade: ${key}`,-cost);
    addNews({text:`Staff upgraded: ${key} to level ${level+1}.`,icon:"STAFF"});
    setGame(g);
  };

  const upgradeAcademy=()=>{
    const tier=game?.academy?.tier||1;
    const cost=round2(2.5+tier*1.6);
    if(tier>=5||game.budget<cost)return;
    const g={...game,academy:{...game.academy,tier:tier+1}};
    cashflow(g,"Academy upgrade",-cost);
    addNews({text:`Youth academy upgraded to tier ${tier+1}.`,icon:"YTH"});
    setGame(g);
  };

  const setAcademyFocus=(focus)=>{
    const g={...game,academy:{...game.academy,focus}};
    setGame(g);
  };

  const startStadiumProject=(kind)=>{
    if(game.stadiumProject)return;
    const projects={
      seats:{name:"Capacity Expansion",weeklyCost:1.05,weeksLeft:20,capGain:7000,commGain:0},
      hospitality:{name:"Hospitality Upgrade",weeklyCost:0.85,weeksLeft:14,capGain:0,commGain:6},
    };
    const p=projects[kind];
    if(!p)return;
    const g={...game,stadiumProject:{...p,kind}};
    addNews({text:`Started stadium project: ${p.name}.`,icon:"FAC"});
    setGame(g);
  };

  const doSave=()=>{const ok=saveGame({...game,form,news:normalizeNewsEntries(news)});setSaveMsg(ok?"OK":"ERR");setTimeout(()=>setSaveMsg(""),2000);};
  const newGame=()=>{delSave();setGame(null);setScreen("title");setTab("overview");setMatchView(null);setTargets([]);setNego(null);setSelP(null);setDecision(null);setNews([]);};

  if(screen==="loading")return(<div style={{...S.page,display:"flex",alignItems:"center",justifyContent:"center"}}><style>{fonts}{`@keyframes p{0%,100%{opacity:1}50%{opacity:.4}}`}</style><div style={{fontFamily:"'Oswald',sans-serif",fontSize:22,letterSpacing:4,color:"#38bdf8",animation:"p 1.5s infinite"}}>LOADING...</div></div>);

  if(screen==="title")return(<div style={{...S.page,display:"flex",flexDirection:"column",alignItems:"center",padding:16,overflowY:"auto"}}><style>{fonts}{`@keyframes su{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    <div style={{marginTop:30,fontSize:12,letterSpacing:8,color:"#38bdf8",fontFamily:"'Oswald',sans-serif"}}>⚽ PREMIER LEAGUE</div>
    <h1 style={{fontSize:"clamp(28px,6vw,48px)",fontFamily:"'Oswald',sans-serif",fontWeight:700,letterSpacing:3,margin:"4px 0",background:"linear-gradient(135deg,#e2e8f0,#38bdf8)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textAlign:"center"}}>OWNER SIMULATOR V3</h1>
    <p style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:"#475569",margin:"4px 0 20px",textAlign:"center",maxWidth:400}}>Real players • Contracts • Injuries • Development • AI transfers • News</p>
    <div style={{fontSize:10,letterSpacing:3,color:"#64748b",fontFamily:"'Oswald',sans-serif",marginBottom:10}}>SELECT YOUR CLUB</div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))",gap:6,maxWidth:660,width:"100%",marginBottom:16}}>
      {CLUBS.map(c=>(<button key={c.id} onClick={()=>setSelClub(c)} style={{background:selClub?.id===c.id?`linear-gradient(135deg,${c.color}22,${c.color}0a)`:"rgba(255,255,255,0.02)",border:selClub?.id===c.id?`2px solid ${c.color}`:"1px solid rgba(255,255,255,0.06)",borderRadius:6,padding:"8px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
        <div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${c.color},${c.accent||c.color}55)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0}}>⚽</div>
        <div style={{textAlign:"left"}}><div style={{fontSize:13,letterSpacing:1,color:"#e2e8f0",fontFamily:"'Oswald',sans-serif"}}>{c.name}</div><div style={{fontSize:9,color:"#475569",fontFamily:"'JetBrains Mono',monospace"}}>${c.budget}M • {c.mgr}</div></div>
      </button>))}
    </div>
    {selClub&&<div style={{textAlign:"center",animation:"su 0.25s ease",marginBottom:24}}><button onClick={()=>initGame(selClub)} style={S.btn(selClub.color,"lg")}>Buy {selClub.name} →</button></div>}
  </div>);

  if(!game||!mc)return null;
  return(<div style={{...S.page,display:"flex",flexDirection:"column",height:"100vh"}}><style>{fonts}{`@keyframes si{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}@keyframes fi{from{opacity:0}to{opacity:1}}*::-webkit-scrollbar{width:3px}*::-webkit-scrollbar-thumb{background:#334155;border-radius:3px}`}</style>

    {/* HEADER */}
    <div style={{background:`linear-gradient(135deg,${cc}18,${cc}06)`,borderBottom:`1px solid ${cc}33`,padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:26,height:26,borderRadius:"50%",background:`linear-gradient(135deg,${cc},${cc}66)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>⚽</div>
        <div><div style={{fontSize:15,fontFamily:"'Oswald',sans-serif",letterSpacing:1.5,fontWeight:600}}>{mc.name}</div><div style={{fontSize:9,fontFamily:"'JetBrains Mono',monospace",color:"#475569"}}>S{game.season} {game.phase==="pre"?"Pre-season":`W${game.wk}/38`}</div></div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:15,fontFamily:"'JetBrains Mono',monospace",color:game.budget>0?"#10b981":"#ef4444",fontWeight:700}}>${Math.round(game.budget)}M</span><button onClick={doSave} style={S.ghost}>{saveMsg||"💾"}</button><button onClick={newGame} style={S.ghost}>NEW</button></div>
    </div>

    {/* TABS */}
    <div style={{display:"flex",borderBottom:"1px solid rgba(255,255,255,0.05)",overflowX:"auto",flexShrink:0}}>
      {["overview","squad","tactics","transfers","finances","table","news"].map(t=>(<button key={t} onClick={()=>{setTab(t);if(t==="transfers"&&targets.length===0)openMkt(scoutPos);}} style={S.tab(tab===t,cc)}>{t}</button>))}
    </div>

    {/* OVERLAYS */}
    {decision&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:16}}><div style={{...S.card,maxWidth:360,width:"100%",padding:20,animation:"fi 0.25s"}}>
      <span style={S.label}>📋 Decision: {decision.title}</span>
      {decision.opts.map((o,i)=>(<button key={i} onClick={()=>handleDec(o)} style={{width:"100%",textAlign:"left",padding:"8px 12px",marginBottom:5,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:6,cursor:"pointer",color:"#e2e8f0"}}><div style={{fontSize:12,fontWeight:600}}>{o.text}</div><div style={{fontSize:9,color:"#475569"}}>{Object.entries(o.e).filter(([,v])=>v).map(([k,v])=>`${k}:${v>0?"+":""}${v}`).join(" ")}</div></button>))}
    </div></div>}
    {game.over&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100,padding:16}}><div style={{...S.card,maxWidth:360,width:"100%",padding:24,textAlign:"center",animation:"fi 0.4s"}}>
      <div style={{fontSize:32,fontFamily:"'Oswald',sans-serif",letterSpacing:3}}>GAME OVER</div>
      <div style={{fontSize:13,color:"#fca5a5",fontFamily:"'JetBrains Mono',monospace",margin:"12px 0"}}>{game.overR}</div>
      {game.sr.length>0&&<div style={{marginBottom:16}}>{game.sr.map((s,i)=>(<div key={i} style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:"#94a3b8"}}>S{s.s}: {s.pos}{s.pos<=3?["st","nd","rd"][s.pos-1]:"th"} ({s.pts}pts)</div>))}</div>}
      <button onClick={newGame} style={S.btn(cc,"lg")}>New Game</button>
    </div></div>}

    {/* CONTENT */}
    <div style={{flex:1,overflowY:"auto",padding:10}}>

      {tab==="overview"&&<div style={{animation:"fi 0.2s"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
          <div style={S.card}><Bar label="Squad" value={ms.reduce((s,p)=>s+p.ovr,0)/Math.max(ms.length,1)} color="#38bdf8" icon="👥"/><Bar label="Fans" value={game.fan} color="#10b981" icon="❤️"/><Bar label="Rep" value={game.rep} color="#a855f7" icon="🌟"/></div>
          <div style={S.card}><Bar label="Manager" value={game.mgr} color="#f59e0b" icon="🤝"/><Bar label="Commercial" value={game.comm} color="#06b6d4" icon="💼"/><Bar label="PSR Risk" value={game.psr} color="#ef4444" icon="⚠️"/></div>
        </div>

        {game.phase==="pre"&&!game.over&&<div style={{...S.card,marginBottom:10,textAlign:"center"}}><span style={S.label}>Pre-Season</span><p style={{fontSize:12,color:"#94a3b8",margin:"6px 0"}}>Transfer window is open! Go to Transfers to strengthen your squad.</p><button onClick={advance} style={{...S.btn(cc,"lg"),width:"100%"}}>Start Season →</button></div>}

        {game.phase==="season"&&mm&&!mm.played&&!matchView&&<div style={{...S.card,marginBottom:10,textAlign:"center"}}><span style={S.label}>Matchday {game.wk}</span>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,margin:"8px 0"}}>
            {[mm.home,mm.away].map(id=>{const cl=CLUBS.find(c=>c.id===id);return(<div key={id}><div style={{width:34,height:34,borderRadius:"50%",background:`linear-gradient(135deg,${cl?.color||"#333"},${cl?.color||"#333"}77)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,margin:"0 auto 3px"}}>⚽</div><div style={{fontSize:11,fontFamily:"'Oswald',sans-serif"}}>{cl?.short}</div></div>);})}
          </div>
          <button onClick={playMatch} style={{...S.btn(cc,"lg"),width:"100%"}}>⚽ Play Match</button>
        </div>}

        {matchView&&<div style={{...S.card,marginBottom:10,animation:"si 0.3s"}}><span style={S.label}>Result</span>
          <div style={{textAlign:"center",fontSize:24,fontFamily:"'Oswald',sans-serif",letterSpacing:2,margin:"6px 0"}}>{matchView.isH?mc.short:matchView.oClub.short} {matchView.res.homeGoals}-{matchView.res.awayGoals} {matchView.isH?matchView.oClub.short:mc.short}</div>
          <div style={{maxHeight:180,overflowY:"auto",margin:"8px 0"}}>{matchView.res.events.filter(e=>["goal","red","yellow","half","full","save","injury","var"].includes(e.type)).map((ev,i)=>(<MEvent key={i} ev={ev}/>))}</div>
          <button onClick={advance} style={{...S.btn(cc),width:"100%"}}>Continue →</button>
        </div>}

        {game.phase==="season"&&(!mm||mm.played)&&!matchView&&!game.over&&<button onClick={advance} style={{...S.btn(cc,"lg"),width:"100%",marginBottom:10}}>Advance Week →</button>}

        {/* News ticker */}
        <div style={S.card}><span style={S.label}>News Feed</span><div style={{maxHeight:160,overflowY:"auto"}}>{news.slice(0,8).map((n,i)=>(<div key={i} style={{padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.03)",fontSize:11,color:"#94a3b8"}}><span style={{marginRight:6,color:"#64748b"}}>{MOJIBAKE_RE.test(n.icon||"")?"NEWS":(n.icon||"NEWS")}</span>{n.text}</div>))}</div></div>
      </div>}

      {tab==="squad"&&<div style={{animation:"fi 0.2s"}}><span style={S.label}>Squad ({ms.length}) • Wages: ${(ms.reduce((s,p)=>s+p.wage,0)/1000).toFixed(1)}M/wk</span>
        <div style={S.card}><div style={{display:"grid",gridTemplateColumns:"30px 36px 1fr 28px 28px 48px",gap:4,padding:"3px 8px",fontSize:8,color:"#334155",fontFamily:"'Oswald',sans-serif",letterSpacing:1}}><span>POS</span><span>OVR</span><span>NAME</span><span>AGE</span><span>FIT</span><span>WAGE</span></div>
          <div style={{maxHeight:360,overflowY:"auto"}}>{[...ms].sort((a,b)=>{const o={GK:0,CB:1,LB:2,RB:3,CDM:4,CM:5,CAM:6,LW:7,RW:8,ST:9};return(o[a.pos]||5)-(o[b.pos]||5)||b.ovr-a.ovr;}).map(p=>(<PRow key={p.id} p={p} color={cc} onClick={()=>setSelP(selP?.id===p.id?null:p)} selected={selP?.id===p.id}/>))}</div>
        </div>
        {selP&&<div style={{...S.card,marginTop:6,animation:"si 0.2s"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontSize:14,fontWeight:700}}>{selP.name}</div><div style={{fontSize:10,color:"#475569"}}>{selP.pos} • {selP.age}y • Contract: {selP.contractYears}yr</div></div><div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:selP.ovr>=85?"#10b981":"#38bdf8"}}>{selP.ovr}</div><div style={{fontSize:8,color:"#475569"}}>POT: {selP.pot}</div></div></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginTop:8}}><Bar label="Fitness" value={selP.fitness} color="#10b981" icon="💪" small/><Bar label="Form" value={selP.form} color="#38bdf8" icon="📈" small/></div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginTop:6,fontSize:10,fontFamily:"'JetBrains Mono',monospace"}}><div>Apps: {selP.apps}</div><div>Wage: {fmtK(selP.wage)}</div><div>Val: {fmtM(selP.value)}</div><div>Release: {fmtM(selP.releaseClause)}</div><div>Bonus: {fmtBonus(selP.sigBonus)}</div><div>Loyalty: {fmtK(selP.loyBonus)}</div></div>
          <button onClick={()=>sellP(selP)} style={{...S.btn("#ef4444","sm"),marginTop:8}}>Sell Player</button>
        </div>}
      </div>}

      {tab==="tactics"&&<div style={{animation:"fi 0.2s"}}><span style={S.label}>Formation</span>
        <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>{Object.keys(FORMATIONS).map(f=>(<button key={f} onClick={()=>{setForm(f);setManualXI(null);setSwapFrom(null);}} style={{...S.btn(form===f?cc:"#334155","sm"),background:form===f?`${cc}28`:"rgba(255,255,255,0.03)",border:form===f?`1px solid ${cc}`:"1px solid rgba(255,255,255,0.06)"}}>{f}</button>))}</div>
        <div style={{...S.card,marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span style={S.label}>Match Profile</span>
            <div style={{display:"flex",gap:4}}>
              <button onClick={()=>applyTacticPreset("balanced")} style={S.ghost}>Balanced</button>
              <button onClick={()=>applyTacticPreset("attacking")} style={S.ghost}>Attack</button>
              <button onClick={()=>applyTacticPreset("counter")} style={S.ghost}>Counter</button>
              <button onClick={()=>applyTacticPreset("defensive")} style={S.ghost}>Defend</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {[["tempo","Tempo"],["width","Width"],["press","Press"],["line","Def Line"]].map(([k,label])=>(
              <div key={k}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#94a3b8",marginBottom:3}}><span>{label}</span><span style={{fontFamily:"'JetBrains Mono',monospace"}}>{Math.round(game.tactics?.[k]??50)}</span></div>
                <input type="range" min="0" max="100" value={game.tactics?.[k]??50} onChange={e=>setTacticValue(k,e.target.value)} style={{width:"100%"}}/>
              </div>
            ))}
          </div>
        </div>
        
        {/* PITCH with clickable players */}
        {(()=>{const xi=getXI();const layout=FORM_LAYOUT[form]||FORM_LAYOUT["4-3-3"];
        return(<div style={{position:"relative",width:"100%",paddingTop:"140%",background:"linear-gradient(180deg,#1a6e2e 0%,#1f7a34 15%,#1a6e2e 30%,#1f7a34 45%,#1a6e2e 60%,#1f7a34 75%,#1a6e2e 90%,#1f7a34 100%)",borderRadius:10,overflow:"hidden",border:"2px solid #2d8b40",marginBottom:8}}>
          <div style={{position:"absolute",inset:0}}>
            <div style={{position:"absolute",top:"0%",left:"50%",transform:"translateX(-50%)",width:"40%",height:"16%",border:"2px solid rgba(255,255,255,0.25)",borderTop:"none",borderRadius:"0 0 8px 8px"}}/>
            <div style={{position:"absolute",bottom:"0%",left:"50%",transform:"translateX(-50%)",width:"40%",height:"16%",border:"2px solid rgba(255,255,255,0.25)",borderBottom:"none",borderRadius:"8px 8px 0 0"}}/>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:60,height:60,borderRadius:"50%",border:"2px solid rgba(255,255,255,0.25)"}}/>
            <div style={{position:"absolute",top:"50%",left:0,right:0,height:0,borderTop:"2px solid rgba(255,255,255,0.25)"}}/>
          </div>
          {layout.map((pos,i)=>{const p=xi[i];if(!p||!pos)return null;const oc=p.ovr>=85?"#10b981":p.ovr>=78?"#38bdf8":p.ovr>=70?"#eab308":"#fff";const isSel=swapFrom===p.id;
          return(<div key={p.id} onClick={()=>setSwapFrom(swapFrom===p.id?null:p.id)} style={{position:"absolute",top:`${pos.r}%`,left:`${pos.c}%`,transform:"translate(-50%,-50%)",textAlign:"center",zIndex:2,cursor:"pointer"}}>
            <div style={{width:38,height:38,borderRadius:"50%",background:isSel?`linear-gradient(135deg,#f59e0b,#f97316)`:`linear-gradient(135deg,${cc},${cc}aa)`,border:isSel?`3px solid #fff`:`2px solid ${oc}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:"#fff",margin:"0 auto",boxShadow:isSel?"0 0 14px rgba(245,158,11,0.6)":"0 2px 8px rgba(0,0,0,0.4)",transition:"all 0.15s"}}>{p.ovr}</div>
            <div style={{fontSize:9,fontWeight:700,color:isSel?"#f59e0b":"#fff",textShadow:"0 1px 3px rgba(0,0,0,0.8)",marginTop:2,whiteSpace:"nowrap",fontFamily:"'Oswald',sans-serif",letterSpacing:0.5}}>{p.name.split(" ").pop()?.toUpperCase()}</div>
            <div style={{fontSize:7,color:"rgba(255,255,255,0.6)",fontFamily:"'JetBrains Mono',monospace"}}>{p.pos}</div>
          </div>);})}
        </div>);})()}
        
        {getXI().filter(Boolean).length<11&&<div style={{padding:8,fontSize:11,color:"#ef4444"}}>⚠️ Not enough fit players for a full XI!</div>}
        
        {/* Substitution instructions */}
        {swapFrom?<div style={{...S.card,marginBottom:8,borderColor:"#f59e0b44",background:"rgba(245,158,11,0.06)"}}>
          <div style={{fontSize:11,color:"#f59e0b",fontFamily:"'Oswald',sans-serif",letterSpacing:1,marginBottom:6}}>🔄 SELECT A BENCH PLAYER TO SWAP IN</div>
          <div style={{fontSize:10,color:"#94a3b8",marginBottom:6}}>Replacing: <strong style={{color:"#e2e8f0"}}>{ms.find(p=>p.id===swapFrom)?.name}</strong></div>
          <button onClick={()=>setSwapFrom(null)} style={{...S.btn("#475569","sm"),marginBottom:4}}>Cancel</button>
        </div>:<div style={{fontSize:10,color:"#64748b",marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>Tap a player on the pitch to substitute them</div>}
        
        {/* Bench — clickable to sub IN when a starter is selected */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={S.label}>Bench</span>
          {manualXI&&<button onClick={resetXI} style={S.ghost}>↺ Auto-Pick</button>}
        </div>
        <div style={S.card}>{(()=>{
          const xi=getXI();
          const bench=ms
            .filter(p=>!p.injured&&!p.suspended&&p.id!==swapFrom)
            .sort((a,b)=>b.ovr-a.ovr)
            .slice(0,12);
          if(!bench.length){
            return <div style={{padding:8,fontSize:10,color:"#64748b"}}>No fit players available.</div>;
          }
          return bench.map(p=>{
            const canSub=!!swapFrom;
            return(<div key={p.id} onClick={()=>{if(canSub)handleSub(p);}} style={{display:"grid",gridTemplateColumns:"36px 1fr 28px",alignItems:"center",gap:4,padding:"5px 8px",fontSize:11,borderBottom:"1px solid rgba(255,255,255,0.03)",cursor:canSub?"pointer":"default",background:canSub?"rgba(245,158,11,0.04)":"transparent",borderLeft:canSub?"2px solid #f59e0b33":"2px solid transparent",transition:"all 0.1s"}}>
              <span style={{width:26,height:26,borderRadius:"50%",background:(p.ovr>=85?"#10b981":p.ovr>=78?"#38bdf8":p.ovr>=70?"#eab308":"#94a3b8")+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:p.ovr>=85?"#10b981":p.ovr>=78?"#38bdf8":p.ovr>=70?"#eab308":"#94a3b8",fontFamily:"'JetBrains Mono',monospace"}}>{p.ovr}</span>
              <div style={{overflow:"hidden"}}><div style={{fontSize:11,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{canSub?"IN ":""}{p.name}</div></div>
              <span style={{fontSize:8,color:"#475569"}}>{p.pos}</span>
            </div>);
          });
        })()}</div>
      </div>}

      {tab==="transfers"&&<div style={{animation:"fi 0.2s"}}>
        {nego?<div style={S.card}><span style={S.label}>🤝 {nego.p.name} ({nego.p.pos} {nego.p.ovr})</span>
          <div style={{maxHeight:90,overflowY:"auto",marginBottom:10,background:"rgba(0,0,0,0.2)",borderRadius:5,padding:8}}>{nego.msgs.map((m,i)=>(<div key={i} style={{fontSize:11,color:"#94a3b8",marginBottom:4,fontFamily:"'JetBrains Mono',monospace"}}>{m}</div>))}</div>
          {nego.status==="open"&&<div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:8}}>
            {[["Fee $M","fee"],["Wage $K","wage"],["Years","years"],["Agent $K","agentFee"],["Sell-on %","sellOn"],["Bonus $K","sigBonus"]].map(([l,k])=>(<div key={k}><div style={{fontSize:8,color:"#475569"}}>{l}</div><input type="number" min={k==="years"?1:0} value={nego[k]} onChange={e=>setNego(n=>({...n,[k]:Number(e.target.value)}))} style={{width:"100%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:3,padding:"4px",color:"#e2e8f0",fontSize:11,fontFamily:"'JetBrains Mono',monospace"}}/></div>))}
          </div><div style={{display:"flex",gap:6}}><button onClick={submitOffer} style={S.btn("#10b981","sm")}>Submit</button><button onClick={()=>setNego(null)} style={S.ghost}>Walk Away</button></div></div>}
          {nego.status==="open"&&<div style={{fontSize:10,color:"#94a3b8",marginTop:4}}>Sign bonus preview: <strong style={{color:"#e2e8f0"}}>{fmtBonus(nego.sigBonus)}</strong> | Agent fee preview: <strong style={{color:"#e2e8f0"}}>{fmtBonus(nego.agentFee)}</strong></div>}
          {nego.status==="accepted"&&<div style={{display:"flex",gap:6}}><button onClick={completeTx} style={S.btn("#10b981")}>✅ Complete</button><button onClick={()=>setNego(null)} style={S.ghost}>Cancel</button></div>}
          {(nego.status==="rejected"||nego.status==="collapsed")&&<button onClick={()=>setNego(null)} style={S.btn("#ef4444","sm")}>Close</button>}
        </div>:<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={S.label}>Transfer Market</span><button onClick={()=>openMkt(scoutPos)} style={S.btn(cc,"sm")}>🔍 Scout</button></div>
          <div style={{display:"flex",gap:3,marginBottom:8,flexWrap:"wrap"}}>{["ALL","GK","CB","LB","RB","CDM","CM","CAM","LW","RW","ST"].map(p=>(<button key={p} onClick={()=>{setScoutPos(p);}} style={{padding:"3px 8px",fontSize:9,fontFamily:"'Oswald',sans-serif",letterSpacing:1,background:scoutPos===p?`${cc}28`:"rgba(255,255,255,0.03)",border:scoutPos===p?`1px solid ${cc}`:"1px solid rgba(255,255,255,0.06)",borderRadius:4,color:scoutPos===p?"#e2e8f0":"#64748b",cursor:"pointer"}}>{p}</button>))}</div>
          <div style={S.card}>{targets.length===0?<div style={{padding:16,textAlign:"center",fontSize:11,color:"#475569"}}>Press Scout to find targets.</div>:
            targets.map(p=>(<div key={p.id} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 8px",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}><span style={{width:24,height:24,borderRadius:"50%",background:p.ovr>=80?"#10b98118":"#38bdf818",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",color:p.ovr>=80?"#10b981":"#38bdf8"}}>{p.ovr}</span>
                <div><div style={{fontSize:11,fontWeight:600}}>{p.name}</div><div style={{fontSize:9,color:"#475569"}}>{p.pos} {p.age}y • {fmtM(p.askPrice)} • {fmtK(p.agentWage)}/wk</div></div></div>
              <button onClick={()=>startNego(p)} style={S.btn(cc,"sm")}>Negotiate</button>
            </div>))}
          </div>
          {game.txDone.length>0&&<div style={{...S.card,marginTop:6}}><span style={S.label}>Activity</span>{game.txDone.map((t,i)=>(<div key={i} style={{fontSize:11,padding:"3px 0",borderBottom:"1px solid rgba(255,255,255,0.03)",display:"flex",justifyContent:"space-between"}}><span>{t.type==="in"?"✈️":"💰"} {t.name}</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:t.type==="in"?"#ef4444":"#10b981"}}>{t.type==="in"?"-":"+"}${t.fee}M</span></div>))}</div>}
        </>}
      </div>}

      {tab==="finances"&&<div style={{animation:"fi 0.2s"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:8}}>
          <div style={{...S.card,textAlign:"center"}}><div style={{fontSize:30,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:game.budget>0?"#10b981":"#ef4444",margin:"6px 0"}}>${Math.round(game.budget)}M</div><div style={{fontSize:10,color:"#475569"}}>Available Funds</div></div>
          <div style={S.card}>
            <span style={S.label}>Weekly Outlook</span>
            <div style={{fontSize:17,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:runRateM>=0?"#10b981":"#ef4444"}}>{runRateM>=0?"+":"-"}${Math.abs(runRateM).toFixed(2)}M</div>
            <div style={{fontSize:10,color:"#64748b",marginTop:4}}>Wages {wageBillM.toFixed(2)}M • Staff {staffCostM.toFixed(2)}M • Academy {academyCostM.toFixed(2)}M • Amort {amortCostM.toFixed(2)}M</div>
          </div>
        </div>

        <div style={{...S.card,marginBottom:8}}>
          <span style={S.label}>Wage Management</span>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div style={{fontSize:11,color:"#94a3b8"}}>Weekly Wage Bill: <strong style={{color:wageBillM<=game.wageBudget?"#10b981":"#ef4444"}}>${wageBillM.toFixed(2)}M</strong> / Budget ${game.wageBudget?.toFixed(2)}M</div>
            <div style={{display:"flex",gap:4}}>
              <button onClick={()=>adjustWageBudget(-0.1)} style={S.ghost}>-0.1</button>
              <button onClick={()=>adjustWageBudget(0.1)} style={S.ghost}>+0.1</button>
            </div>
          </div>
          {(game.wageDemands||[]).length===0?<div style={{fontSize:10,color:"#64748b"}}>No active wage demands.</div>:(game.wageDemands||[]).map(d=>(<div key={d.id} style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:6,alignItems:"center",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
            <div style={{fontSize:11}}>{d.name} wants <span style={{fontFamily:"'JetBrains Mono',monospace"}}>{fmtK(d.request)}/wk</span> for {d.years}y (deadline W{d.deadline})</div>
            <button onClick={()=>resolveWageDemand(d,true)} style={S.btn("#10b981","sm")}>Accept</button>
            <button onClick={()=>resolveWageDemand(d,false)} style={S.btn("#ef4444","sm")}>Reject</button>
          </div>))}
        </div>

        <div style={{...S.card,marginBottom:8}}>
          <span style={S.label}>Sponsor Management</span>
          {game.sponsor?<div style={{fontSize:11,marginBottom:6}}><strong>{game.sponsor.name}</strong> ({game.sponsor.tier}) • ${game.sponsor.weekly}M/wk • {game.sponsor.weeksLeft}w left</div>:<div style={{fontSize:10,color:"#64748b",marginBottom:6}}>No active sponsor.</div>}
          {(game.sponsorOffers||[]).length===0?<div style={{fontSize:10,color:"#64748b"}}>No offers this week.</div>:(game.sponsorOffers||[]).map(o=>(<div key={o.id} style={{display:"grid",gridTemplateColumns:"1fr auto",gap:6,alignItems:"center",padding:"5px 0",borderBottom:"1px solid rgba(255,255,255,0.03)"}}>
            <div style={{fontSize:11}}><strong>{o.name}</strong> • ${o.weekly}M/wk • upfront ${o.upfront}M • {o.weeks}w</div>
            <button onClick={()=>acceptSponsorOffer(o)} style={S.btn(cc,"sm")}>Sign</button>
          </div>))}
        </div>

        <div style={{...S.card,marginBottom:8}}>
          <span style={S.label}>Infrastructure + Matchday</span>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:6,alignItems:"center",marginBottom:6}}>
            <div style={{fontSize:11}}>Ticket Price: <strong>${game.ticketPrice}</strong> (capacity {clubCap.toLocaleString()})</div>
            <div style={{display:"flex",gap:4}}><button onClick={()=>adjustTicket(-1)} style={S.ghost}>-1</button><button onClick={()=>adjustTicket(1)} style={S.ghost}>+1</button></div>
          </div>
          <div style={{fontSize:10,color:"#64748b",marginBottom:6}}>Staff levels: Recruitment {game.staff?.recruitment} • Medical {game.staff?.medical} • Analytics {game.staff?.analytics}</div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>
            <button onClick={()=>upgradeStaff("recruitment")} style={S.btn("#2563eb","sm")}>Recruit+</button>
            <button onClick={()=>upgradeStaff("medical")} style={S.btn("#0891b2","sm")}>Medical+</button>
            <button onClick={()=>upgradeStaff("analytics")} style={S.btn("#7c3aed","sm")}>Analytics+</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto auto",gap:6,alignItems:"center",marginBottom:6}}>
            <div style={{fontSize:11}}>Academy Tier {game.academy?.tier} • Focus {game.academy?.focus}</div>
            <select value={game.academy?.focus||"Local"} onChange={e=>setAcademyFocus(e.target.value)} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:3,padding:"4px",color:"#e2e8f0",fontSize:11}}>
              {["Local","Europe","Global"].map(f=><option key={f} value={f} style={{background:"#0f172a"}}>{f}</option>)}
            </select>
            <button onClick={upgradeAcademy} style={S.btn("#f59e0b","sm")}>Academy+</button>
          </div>
          {game.stadiumProject?<div style={{fontSize:10,color:"#94a3b8"}}>{game.stadiumProject.name}: {game.stadiumProject.weeksLeft} weeks left at ${game.stadiumProject.weeklyCost}M/wk</div>:<div style={{display:"flex",gap:4,flexWrap:"wrap"}}><button onClick={()=>startStadiumProject("seats")} style={S.btn("#0ea5e9","sm")}>Start Capacity</button><button onClick={()=>startStadiumProject("hospitality")} style={S.btn("#14b8a6","sm")}>Start Hospitality</button></div>}
        </div>

        <div style={S.card}>
          <span style={S.label}>Season P&L + Weekly Ledger</span>
          {[["TV Revenue",game.tvRev,1],["Commercial Base",game.spRev,1],["Total In",game.sInc,1],["Total Out",game.sExp,-1]].map(([l,a,t],i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",fontSize:12}}><span style={{color:"#64748b"}}>{l}</span><span style={{color:t>0?"#10b981":"#ef4444",fontFamily:"'JetBrains Mono',monospace"}}>{t<0?"-":"+"}${Math.abs(a).toFixed(1)}M</span></div>)}
          <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"6px 0"}}/>
          <div style={{maxHeight:140,overflowY:"auto"}}>{(game.financeLog||[]).slice(0,14).map((r,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"52px 1fr 70px",gap:6,padding:"3px 0",fontSize:10,borderBottom:"1px solid rgba(255,255,255,0.02)"}}><span style={{color:"#64748b"}}>S{r.season}W{r.wk}</span><span style={{color:"#94a3b8",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.label}</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:r.amount>=0?"#10b981":"#ef4444",textAlign:"right"}}>{r.amount>=0?"+":"-"}${Math.abs(r.amount).toFixed(2)}M</span></div>))}</div>
          <div style={{marginTop:8}}><Bar label="PSR Pressure" value={game.psr} color="#ef4444" icon="PSR"/><Bar label="Board Patience" value={game.board?.patience||0} color="#38bdf8" icon="BOARD"/></div>
        </div>
      </div>}

      {tab==="table"&&<div style={{animation:"fi 0.2s"}}><div style={S.card}><span style={S.label}>Premier League — S{game.season}</span><Table clubs={CLUBS} fixtures={game.fix} pid={game.pid}/></div></div>}

      {tab==="news"&&<div style={{animation:"fi 0.2s"}}><div style={S.card}><span style={S.label}>News & Press</span><div style={{maxHeight:450,overflowY:"auto"}}>{news.map((n,i)=>(<div key={i} style={{padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.03)",fontSize:12,color:"#cbd5e1"}}><span style={{marginRight:6,color:"#64748b"}}>{MOJIBAKE_RE.test(n.icon||"")?"NEWS":(n.icon||"NEWS")}</span>{n.text}</div>))}</div></div></div>}

    </div>
  </div>);
}
