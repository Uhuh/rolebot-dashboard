import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'emoji',
})
export class EmojiPipe implements PipeTransform {
  constructor(private readonly domSanitizer: DomSanitizer) {}
  transform(emoji: string): SafeHtml {
    const codePoint = emoji.codePointAt(0)?.toString(16) ?? '';
    const castedCode = twemoji.convert.fromCodePoint(codePoint);

    return this.domSanitizer.bypassSecurityTrustHtml(
      twemoji.parse(castedCode, {
        folder: 'svg',
        ext: '.svg',
      })
    );
  }
}

declare var twemoji: {
  convert: { fromCodePoint(str: string): string };
  parse(str: string, options?: { folder: string; ext: string }): string;
};
