import {prismaClient} from "../src/config/database.js"

const main = async () => {
    await prismaClient.roles.createMany({
        data: [
            {id:"7f3feafd-8dcd-4b95-b213-9b3feee0f61c",name: "admin"},
            {id:"04fc88ad-b2fe-4dbb-bf69-8d2cf65d0f7f",name: "user"}
        ]
    })
    await prismaClient.contentCategory.createMany({
        data: [
            {id:"b7d356fb-f506-4ed8-ae99-ff79373cfa88",name: "news"},
            {id:"740e4e37-907c-4de0-81f1-fdcca7debd9d",name: "article"},
            {id:"2ef5b07b-0c6f-47c1-9631-bf98a2786dd7",name: "common"},
            {id:"c45bfd26-375f-4c34-8bad-8333bac2eed6",name: "opinion"},
            {id:"6d36b700-2688-40be-8e0c-0ef6ce86a992",name: "figure"},
            {id:"20abef8d-d8a1-47f1-8b06-030f26c84bf0",name: "gallery"}
        ]
    })
}

main()