const SEARCH_AUNT = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

function readFile(name) {
    return fetch(name).then(text => text.text());
}

function mapAunt(line) {
    const name = line.match(/[\w\s\w]+/)[0];
    const result = { name };
    line.replace(/[\w\s\w]+:/,'')
      .split(',')
      .map( p => p.trim())
      .forEach( p => result[p.split(':')[0]] = parseInt(p.split(':')[1].trim()));

    return result;
}

function mapAunts(text){
    return text.split('\n').map(mapAunt);
}

function getAuntPointsMapper(aunt){
    return function (current) {
        var points = 0;
        Object.entries(aunt).forEach( entry => {
            if(current[entry[0]] === entry[1]){
                points++;
            }
        });
        return { name: current.name, points};
    };
}
function sortByPoints(prev,current) {
  if (prev.points > current.points) {
    return -1;
  }
  if (prev.points < current.points) {
    return 1;
  }
  return 0;
}


const mapAuntPoints = getAuntPointsMapper(SEARCH_AUNT);

readFile('input').then(mapAunts).then(aunts => aunts.map(mapAuntPoints)).then(aunts => aunts.sort(sortByPoints))
    .then(sortedAunts => console.log(sortedAunts[0].name));