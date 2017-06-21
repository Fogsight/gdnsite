import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <section className="j-header">
          <div className="col-md-12">
            <h1 className="text-center">Game Jam Essentials</h1>
            <img src="" alt="Game Developers Network Logo" className="img-responsive center-img"/>
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                <h4>Want to meet people, brainstorm, discuss, design, code, drink, sleep, experiment,
                  have fun and make great games? This is exactly the place for you!
                </h4>
                <p className="description">Did you know that we have gamejams monthly? You do now! GameJams are a great way
                  to work with artists of all kinds as well as other game developers to make an awesome game. Did
                  we also mention there's a sticker in it for you as well as a champ role on our Discord? Well
                  we did now!</p>
              </div>
            </div>
            <Link className="join-btn" to="https://discord.gg/sWsrrJQ" target="_blank">Join GDN</Link>
          </div>
        </section>
      </div>
      <div className="row">
        <hr />
        <section className="q-boxes">
          <div className="col-md-4">
            <h4>What will we do?</h4>
            <p>After the Game Jam themes are announced, the brainstorming begins, languages and frameworks are chosen, and the teams
              are formed. Then the real fun begins; making your game!</p>
          </div>
          <div className="col-md-4">
            <h4>Who can participate?</h4>
            <p>You can participate if you're a game developer, artist, musician, student, thinker, etc;
              Anyone interested in making games can enter!</p>
          </div>
          <div className="col-md-4">
            <h4>What to bring?</h4>
            <p>A positive attitude, your game development/artist/sound/creative skills
              and your favorite game engine/language/framework!</p>
          </div>
        </section>
      </div>
      <hr />
      <div className="row push-down">
        <div className="col-md-12">
          <Link to="/jams" className="view-btn">View Jams</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
