import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { AuthenticatedGuard } from 'src/authentication/authenticated.guard';

@UseGuards(AuthenticatedGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiCreatedResponse({ type: Order, description: 'create new order' })
  @ApiBadRequestResponse()
  @Post()
  create(@Request() req, code: number, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, code, createOrderDto);
  }

  @ApiOkResponse({
    type: Order,
    isArray: true,
    description: 'finds all orders',
  })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @ApiOkResponse({ type: Order, description: 'find a specific order' })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
