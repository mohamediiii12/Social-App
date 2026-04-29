import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(value:string | Date): string | null {
    const date = new Date(value).getTime();
    const now = new Date().getTime();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) {
      return `${diff}s`;
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}m`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours}h`;
    } else if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days}d`;
    }else if(diff < 2592000){
      const weeks = Math.floor(diff / 604800);
      return `${weeks}w`;
    }else if(diff < 31536000){
      const months = Math.floor(diff / 2592000);
      return `${months}mo`;
    }else{
      const years = Math.floor(diff / 31536000);
      return `${years}y`;
    }
  }

}
