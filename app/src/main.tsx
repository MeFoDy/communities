import * as React from "react";
import * as ReactDOM from "react-dom";
import * as shuffle from "shuffle-array";
import {chunks} from "./utils";
import {CommunityModel} from "./types";

import "bulma/bulma.sass";
import "./main.scss";

const communities: CommunityModel[][] = chunks(shuffle(require("../../root/communities.json"), {"copy": true}), 4);

ReactDOM.render(
  <Root/>,
  document.getElementById("root")
);

function Root() {
  return (
    <div>
      <Github/>
      <div className="container">
        <Hero/>
        <Communities/>
        <Footer/>
      </div>
    </div>
  )
}

function Github() {
  return (
    <a href="https://github.com/Heapy/communities">
      <img className="page_github_link"
           src={require("../img/forkme_right_white_ffffff.png")}
           alt="Fork me on GitHub"/>
    </a>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Heapy/Communities
          </h1>
          <h2 className="subtitle">
            Список белорусских ИТ-сообществ
          </h2>
        </div>
      </div>
    </section>
  )
}

function Communities() {
  return (
    <div>
      {communities.map((it, idx) => (<CommunityGroup key={idx} groups={it}/>))}
    </div>
  )
}

function CommunityGroup({groups}: { groups: CommunityModel[] }) {
  return (
    <div className="columns">
      {groups.map((it, idx) => (
        <div key={idx} className="column is-3 is-left">
          <Community community={it}/>
        </div>
      ))}
    </div>
  )
}

function Community({community}: { community: CommunityModel }) {
  const src = community.logo
    ? `images/${community.logo}`
    : "images/placeholder.png";

  return (
    <div className="community">
      <div className="community_logo"><img src={src} alt=""/></div>
      <p className="community_name"><a href={community.url}>{community.name}</a></p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Heap/Communities</strong> by <a href="https://hea.app/">Ruslan Ibragimov</a>.
          The source code is licensed <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GNU GPLv3</a>.
          The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA
          4.0</a>.
        </p>
      </div>
    </footer>
  )
}
