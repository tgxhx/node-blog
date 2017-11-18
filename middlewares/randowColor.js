const randomColor = () => { 
    let colors = ['red lighten-1', 'red darken-1', 'red accent-2', 'pink lighten-2', 'pink darken-1', 'pink accent-2', 'purple lighten-2', 'purple darken-1', 'purple darken-1', 'deep-purple accent-2', 'indigo accent-2', 'blue lighten-1', 'blue accent-2', 'blue accent-2', 'cyan', 'cyan accent-2', 'teal lighten-1', 'teal lighten-3', 'teal accent-2', 'green lighten-2', 'green', 'green accent-2', 'lime lighten-1', 'amber darken-1', 'orange lighten-1', 'orange darken-3', 'deep-orange lighten-2', 'blue-grey lighten-2']
    return colors[Math.round(Math.random() * colors.length)]
}

module.exports = randomColor