import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
    constructor (
        
        @InjectRepository(MetaOption)
        private readonly metaOptionRepository: Repository<MetaOption>,
    
    ) {
    }
        
    public async create(createPostMetaOptionDto: CreatePostMetaOptionsDto) {
        let metaOption = this.metaOptionRepository.create(
            createPostMetaOptionDto,
        );
        return await this.metaOptionRepository.save(metaOption)
    }
  
}

