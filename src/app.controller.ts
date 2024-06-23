import { Body, Controller, Delete, Get, Param, Post,Put   } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller("api/app")
export class AppController {

  private items = [
    {id: 1, name: ' Item 1'},
    {id: 2, name: ' Iten 2'},
    {id: 3, name: ' Item 3'}
  ]
  
  @Get()
  getItems(){
    return this.items;
  }


  @Get(":id") 
  getitem(@Param("id") id: string){
    const itemId = parseInt(id); //แปลง ID เป็ณตัวเลข
    const item = this.items.find((i) => i.id === itemId);
    return item ? item : 'item not found '
  }

  @Post()
  createItem(@Body() newItem: {name: string}) {
    const newId = this.items.length + 1;
    const newRecord = {id: newId, name: newItem.name};

    this.items.push(newRecord)

    return newRecord;
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() updateItem: {name: string}) {
    const itemId = parseInt(id);
    const index = this.items.findIndex(i => i.id === itemId);

    if(index !== -1) {
      this.items[index].name = updateItem.name;
      return this.items[index];
    }

    return 'item not found ';
  }


  @Delete('id')
  deleteItem(@Param('id') id:string ){
    const index = this.items.findIndex( i => i.id === idForDelete);
    const idForDelete = parseInt(id);

    if (index !== -1 ) {
      const item = this.items.splice(index, 1);
      return item;
    }

    return 'item not found '
  }
} 
