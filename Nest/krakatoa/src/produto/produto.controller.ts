import {
  Controller,
  Post,
  Put,
  Delete,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { QueryProdutoDto } from './dto/query-produto.dto';
import { Produto } from './schemas/produto.schema';

@Controller('produto')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}
  @Post()
  async CreateProduto(
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<Produto> {
    return await this.produtoService.CreateProduto(createProdutoDto);
  }
  @Put(':id')
  async UpdateProduto(
    @Body() updateProdutoDto: UpdateProdutoDto,
    @Param('id', new ParseIntPipe()) id: string,
  ): Promise<Produto> {
    return await this.produtoService.UpdateProduto(updateProdutoDto, id);
  }
  @Delete(':id')
  async DeleteProduto(@Param('id') id: string): Promise<void> {
    await this.produtoService.DeleteProduto(id);
  }
  @Get()
  async GetAllProdutos(): Promise<Produto[]> {
    return await this.produtoService.GetAllProdutos();
  }
  @Post(':id')
  async GetQueryProdutos(
    @Body() queryProdutoDto: QueryProdutoDto,
  ): Promise<Produto[]> {
    return await this.produtoService.GetProdutoQuery(queryProdutoDto);
  }
}
