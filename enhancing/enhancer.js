module.exports = {
    succeed,
    fail,
    repair,
    get,
}

function succeed(item) {
    return {
        ...item,
        enhancement: item.enhancement === 20 ? 20 : item.enhancement + 1
    }
}

function fail(item) {
    const newEnhancement =
        item.enhancement > 16 ? item.enhancement - 1 : item.enhancement
    let newDurability =
        item.enhancement < 15 ? item.durability - 5 : item.durability - 10
    newDurability = newDurability < 0 ? 0 : newDurability

    return {
        ...item,
        enhancement: newEnhancement, durability: newDurability
    }
}

function repair(item) {
    return { ...item, durability: 100 }
}

function get(item) {
    let newName = item.name
    if (item.enhancement > 0) {
        if (item.name[0] !== "[") {
        newName = `[+${item.enhancement}] ${item.name}`
        } else {
        newName = `[+${item.enhancement}]` + item.name.split("]")[1]
        }
    }
    
    return { ...item, name: newName }
}
