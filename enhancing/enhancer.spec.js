const enhancer = require("./enhancer.js")
// test away!

describe("test repair()", () => {
    const item = {
        name: "Great Hammer",
        enhancement: 5,
        durability: 50
    }

    test("durability to 100", () => {
        expect(enhancer.repair(item).durability).toBe(100)
    })
    test("don't modify name", () => {
        expect(enhancer.repair(item).name).toBe(item.name)
    })
    test("don't modify enhancement", () => {
        expect(enhancer.repair(item).enhancement).toBe(item.enhancement)
    })
})

describe("success()", () => {
    const item = {
        name: "Great Sword",
        enhancement: 5,
        durability: 50
    }
    const perfectItem = {
        name: "Great Sword",
        enhancement: 20,
        durability: 50
    }

    test("increase enhancement by 1", () => {
        expect(enhancer.succeed(item).enhancement).toBe(6)
    })
    test("enhancement is already 20", () => {
        expect(enhancer.succeed(perfectItem).enhancement).toBe(20)
    })
    test("don't modify durability", () => {
        expect(enhancer.succeed(item).durability).toBe(50)
    })
    test("don't modify name", () => {
        expect(enhancer.succeed(item).name).toBe("Great Sword")
    })
})

describe("failed()", () => {
    const item = {
        name: "Great Sword",
        enhancement: 10,
        durability: 50
    }
    const strongerItem = {
        name: "Great Sword",
        enhancement: 17,
        durability: 50
    }
    const damagedItem = {
        name: "Great Sword",
        enhancement: 17,
        durability: 2
    }

    test("don't affect weak item", () => {
        expect(enhancer.fail(item).enhancement).toBe(10)
    })
    test("weaken enhanced item", () => {
        expect(enhancer.fail(strongerItem).enhancement).toBe(16)
    })
    test("damage regular item", () => {
        expect(enhancer.fail(item).durability).toBe(45)
    })
    test("damage enhanced items", () => {
        expect(enhancer.fail(strongerItem).durability).toBe(40)
    })
    test("durability not less than 0", () => {
        expect(enhancer.fail(damagedItem).durability).toBe(0)
    })
})

describe("get()", () => {
    const item = {
        name: "Great Sword",
        enhancement: 5,
        durability: 50
    }
    const boringItem = {
        name: "Great Sword",
        enhancement: 0,
        durability: 50
    }
    const modifiedItem = {
        name: "[+5] Great Sword",
        enhancement: 5,
        durability: 50
    }
    const misnamedItem = {
        name: "[+4] Great Sword",
        enhancement: 5,
        durability: 50
    }

    test("Add modifier", () => {
        expect(enhancer.get(item).name).toBe("[+5] Great Sword")
    })
    test("enhancement is 0", () => {
        expect(enhancer.get(boringItem).name).toBe("Great Sword")
    })
    test("same modifier", () => {
        expect(enhancer.get(modifiedItem).name).toBe("[+5] Great Sword")
    })
    test("Update modifier", () => {
        expect(enhancer.get(misnamedItem).name).toBe("[+5] Great Sword")
    })
})
