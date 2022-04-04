import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summarizeText'
})
export class SummarizeTextPipe implements PipeTransform {

  transform(text: string, limit?: number){

    if(!text) return null;

    let desiredLimit = (limit) ? limit : 50;

    return text.substr(0, desiredLimit) + '...';
  }

}
