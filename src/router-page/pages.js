import React from 'react';
import {
  NavLink,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

export const Home = ({history}) => {
  return (
    <div>
      <p>welcome to my personal page</p>
      <a href="#" onClick={(e) => { e.preventDefault(); history.push('/category'); }}>skip main page...</a>
    </div>
  );
};
export const NoMatch = () => {
  return (
    <p>404 Page Not Found!</p>
  );
};
const Nav = () => {
  return (
    <ul>
      <li><NavLink to="/countries">Countries</NavLink></li>
      <li><NavLink to="/browsers">Browsers</NavLink></li>
    </ul>

  );
};

const Chrome = () => <p>Google Chrome is a freeware web browser developed by Google LLC.[13] It was first released in September 2008, for Microsoft Windows, and was later ported to Linux, macOS, iOS and Android. Google Chrome is also the main component of Chrome OS, where it serves as a platform for running web apps.
</p>;
const Firefox = () => <p>Mozilla Firefox (or simply Firefox) is a free and open-source[21] web browser developed by Mozilla Foundation and its subsidiary, Mozilla Corporation. Firefox is available for Windows, macOS, Linux, and BSD[11][12] operating systems. Its sibling, Firefox for Android, is available for Android. Firefox uses the Gecko layout engine to render web pages, which implements current and anticipated web standards.[22] In 2016, Firefox began incorporating new technology under the code name Quantum to promote parallelism and a more intuitive user interface.[23] An additional version, Firefox for iOS, was released in late 2015; due to platform restrictions, it uses the WebKit layout engine instead of Gecko, as with all other iOS web browsers.

</p>;
const Safari = () => <p>Safari is a web browser developed by Apple based on the WebKit engine. First released in 2003 with Mac OS X Panther, a mobile version has been included in iOS devices since the introduction of the iPhone in 2007. It is the default browser on Apple devices. A Windows version, now discontinued,[3] was available from 2007 to 2012.


</p>;
const Opera = () => <p>Opera is a web browser for Windows, macOS, and Linux operating systems developed by Opera Software AS. It uses the Blink layout engine. An earlier version using the Presto layout engine is still available and runs on FreeBSD systems.
</p>;

export const Browsers = ({history, match}) => {
  return (
    <div>
      <JumpTo history={history} path="/category" text="back to category"/>
      <JumpTo history={history} path="/countries" text="skip to countries page"/>
      <ul>
        <li><NavLink exact to="/browsers/chrome" activeClassName="current">chrome</NavLink></li>
        <li><NavLink to="/browsers/firefox" activeClassName="current">firefox</NavLink></li>
        <li><NavLink to="/browsers/safari" activeClassName="current">safari</NavLink></li>
        <li><NavLink to="/browsers/opera" activeClassName="current">opera</NavLink></li>
      </ul>
      <Switch>
        <Route exact path={`${match.path}/chrome`} component={Chrome} />
        <Route path={`${match.path}/firefox`} component={Firefox} />
        <Route path={`${match.path}/safari`} component={Safari} />
        <Route path={`${match.path}/opera`} component={Opera} />
        <Route component={Chrome} />
      </Switch>
    </div>
  );
};

function JumpTo(props) {
  function onClick(e) {
    e.preventDefault();
    return props.history.push(props.path);
  }
  return <p><a href="#" onClick={onClick}>{props.text}</a></p>;
}
export const Countries = ({history, match}) => {
  return (
    <div>
      <JumpTo history={history} path="/category" text="back to category"/>
      <JumpTo history={history} path="/browsers" text="skip to browsers page"/>
      <ul>
        <li><NavLink exact to="/countries/united-kingdom" activeClassName="current">united-kingdom</NavLink></li>
        <li><NavLink to="/countries/france" activeClassName="current">france</NavLink></li>
        <li><NavLink to="/countries/germany" activeClassName="current">germany</NavLink></li>
        <li><NavLink to="/countries/italy" activeClassName="current">italy</NavLink></li>
      </ul>

      <Switch>
        <Route exact path={`${match.path}/united-kingdom`} render={() => <p>The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK)[10] or Britain,[note 10] is a sovereign country in western Europe. Lying off the north-western coast of the European mainland, the UK includes the island of Great Britain, the north-eastern part of the island of Ireland and many smaller islands.[11] Northern Ireland is the only part of the United Kingdom that shares a land border with another sovereign state‍—‌the Republic of Ireland. Apart from this land border, the UK is surrounded by the Atlantic Ocean, with the North Sea to its east, the English Channel to its south and the Celtic Sea to its south-south-west, giving it the 12th-longest coastline in the world. The Irish Sea lies between Great Britain and Ireland. With an area of 242,500 square kilometres (93,600 sq mi), the UK is the 78th-largest sovereign state in the world. It is also the 21st-most populous country, with an estimated 65.5 million inhabitants in 2016.

        </p>} />
        <Route path={`${match.path}/france`} render={() => <p>France (French: [fʁɑ̃s]), officially the French Republic (French: République française [ʁepyblik fʁɑ̃sɛz]), is a sovereign state whose territory consists of metropolitan France in Western Europe, as well as several overseas regions and territories.[XIII] The metropolitan area of France extends from the Mediterranean Sea to the English Channel and the North Sea, and from the Rhine to the Atlantic Ocean. The overseas territories include French Guiana in South America and several islands in the Atlantic, Pacific and Indian oceans. The country's 18 integral regions (five of which are situated overseas) span a combined area of 643,801 square kilometres (248,573 sq mi) and a total population of 67.25 million (as of June 2018).[10] France is a unitary semi-presidential republic with its capital in Paris, the country's largest city and main cultural and commercial centre. Other major urban centres include Marseille, Lyon, Lille, Nice, Toulouse and Bordeaux.

        </p>} />
        <Route path={`${match.path}/germany`} render={() => <p>Germany (German: Deutschland [ˈdɔʏtʃlant]), officially the Federal Republic of Germany (German: Bundesrepublik Deutschland, About this sound listen (help·info)),[e][8] is a sovereign state in central-western Europe. It includes 16 constituent states, covers an area of 357,021 square kilometres (137,847 sq mi), and has a largely temperate seasonal climate. With about 82 million inhabitants, Germany is the most populous member state of the European Union. Germany's capital and largest metropolis is Berlin, while its largest conurbation is the Ruhr, with its main centres of Dortmund and Essen. The country's other major cities are Hamburg, Munich, Cologne, Frankfurt, Stuttgart, Düsseldorf, Leipzig, Bremen, Dresden, Hannover, and Nuremberg.

        </p>} />
        <Route path={`${match.path}/italy`} render={() => <p>Italy (Italian: Italia [iˈtaːlja] (About this sound listen)), officially the Italian Republic (Italian: Repubblica Italiana [reˈpubblika itaˈljaːna]),[10][11][12][13] is a sovereign state in Europe. Located in the heart of the Mediterranean Sea, Italy shares open land borders with France, Switzerland, Austria, Slovenia, San Marino and Vatican City. Italy covers an area of 301,338 km2 (116,347 sq mi) and has a largely temperate seasonal and Mediterranean climate. With around 61 million inhabitants, it is the fourth-most populous EU member state and the most populous in southern Europe.

        </p>} />
        <Redirect from={`${match.path}/`} to={`${match.path}/united-kingdom`} />
      </Switch>
    </div>
  );
};
export const Category = ({history}) => {
  return (
    <div>
      <JumpTo history={history} path="/" text="back home"/>
      <Nav />
    </div>
  );
};
