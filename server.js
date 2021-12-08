const express = require('express')
const path = require('path') //node native module
const { Restaurant } = require('./models/Restaurant')
const { Menu } = require('./models/Menu')
const { Item } = require('./models/Item')
const app = express()
const port = 3000

//allow jason to read request bodies
app.use(express.json())

//points toward folder of static files
app.use(express.static(path.join(__dirname, 'public')))

//GET method on /flipcoin route responds with heads or tails
app.get('/flipcoin', (req, res) => {
    let coinflip = Math.floor(Math.random()*2)
    if (coinflip == 1){
        coinflip = 'Heads'
    } else {
        coinflip = 'Tails'
    }
    res.send(coinflip)
})

//GET method one restaurant 
app.get('/restaurants/:id', async (req,res) => {
    //find one specific instance of the Restaurant model
    const thisRestaurants = await Restaurant.findByPk(req.params.id)
    //respond with allRestaurants as an array of json objects
    res.json(thisRestaurants)
})


//update one Restaurant by id
app.put('/restaurants/:id', async (req,res) => {
    let updatedRestaurant = await Restaurant.update(req.body, {
        where : {id:req.params.id}
    })
    res.send(updatedRestaurant ? "Restaurant Updated" : "Update Failed")
})

//create one Restaurant
app.post('/restaurants', async (req,res) => {
    //create a restaurant using the json object passed in the request body
    let newRestaurant = await Restaurant.create(req.body)
    //send a response string
    res.send(newRestaurant ? 'Restaurant created': 'post failed')
})







//return one restaurant by id
app.get('/restaurants/:id', async (req,res) => {
    //find one specific instance of the restaurant model
    const thisRestaurant = await Restaurant.findByPk(req.params.id)
    //respond with allRestaurants as an array of json objects
    res.json(thisRestaurant)
})


//delete one by id
 app.delete('/restaurants/:id', async (req, res) => {
     const deleted = await Restaurant.destroy({
        where:{id:req.params.id}

     })
     res.send(deleted ? "Deleted Restaurant" : "Deletion Failed")
 })



//GET method on /restaurants route returns all restaurants
app.get('/menus', async (req,res) => {
    //find all instances of the Model Restaurant
    const allMenus = await Menu.findAll()
    //respond with allRestaurants as a json objeect
    res.json(allMenus)
})
app.get('/menus/:id', async (req,res) => {
    //find all instances of the Model Restaurant
    const thisMenus = await Menu.findByPk(req.params.id)
    //respond with allRestaurants as a json objeect
    res.json(thisMenus)
})

//create one menu
app.post('/menus', async (req,res) => {
    //create a menu using the json object passed in the request body
    let newMenu = await Menu.create(req.body)
    //send a response string
    res.send(newMenu ? 'Menu created': 'post failed')
})


// return one menu by name
app.get('/menus-name/:name', async(req,res)=>{
    //find one specific instance of the Menu model by name
    const thisMenu = await Menu.findOne({where:{name: req.params.name}})
    res.json(thisMenu)
})

// update one menu by id
app.put('/menus/:id', async(req,res) => {
    let updatedMenu = await Menu.update(req.destroy,body, {
        where: {id:req.params.id}
 })
    res.send("updated")
})

//delete one menu by id
app.delete('/menus/:id', async (req, res) => {
    const deleted = await Menu.destroy({
       where:{id:req.params.id}

    })
    res.send(deleted ? "Menus" : "Deletion Failed")
})
app.get('//:id', async (req,res) => {
    //find all instances of the Model Restaurant
    const thisMenus = await Menu.findByPk(req.params.id)
    //respond with allRestaurants as a json objeect
    res.json(thisMenus)
})


//GET method on /restaurants route returns all restaurants
app.get('/items', async (req,res) => {
    //find all instances of the Model Restaurant
    const allItems = await Item.findAll()
    //respond with allRestaurants as a json objeect
    res.json(allItems)
})

//create one item
app.post('/items', async (req,res) => {
    //create a item using the json object passed in the request body
    let newItem = await Item.create(req.body)
    //send a response string
    res.send(newItem ? 'Item created': 'post failed')
})


// update one Item by id
app.put('/item/:id', async(req,res) => {
    let updatedItem = await Item.update(req.destroy,body, {
        where: {id:req.params.id}
 })
    res.send("updated")
})



//delete one by id
app.delete('/items/:id', async (req, res) => {
    const deleted = await Item.destroy({
       where:{id:req.params.id}

    })
    res.send(deleted ? "Deleted Item" : "Deletion Failed")
})




app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})

