// components/Gist.tsx
import { PureComponent } from "react";

export interface GistProps {
  id: string;
  file?: string;
}

export default class Gist extends PureComponent<GistProps> {
  private iframeNode: HTMLIFrameElement | null = null;

  componentDidMount() {
    this.updateIframeContent();
  }

  componentDidUpdate() {
    this.updateIframeContent();
  }

  private defineUrl(): string {
    const { id, file } = this.props;
    const fileArg = file ? `?file=${file}` : "";
    return `https://gist.github.com/${id}.js${fileArg}`;
  }

  private updateIframeContent() {
    const { id, file } = this.props;

    if (!this.iframeNode) return;

    const doc =
      this.iframeNode.contentDocument ||
      this.iframeNode.contentWindow?.document;
    if (!doc) return;

    const gistLink = this.defineUrl();
    const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
    const styles = "<style>*{font-size:12px;}</style>";
    const elementId = file ? `gist-${id}-${file}` : `gist-${id}`;
    const resizeScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
    const iframeHtml = `<html><head><base target="_parent">${styles}</head><body ${resizeScript}>${gistScript}</body></html>`;

    doc.open();
    doc.writeln(iframeHtml);
    doc.close();
  }

  render() {
    const { id, file } = this.props;

    return (
      <iframe
        ref={(n) => {
          this.iframeNode = n;
        }}
        width="100%"
        frameBorder={0}
        id={file ? `gist-${id}-${file}` : `gist-${id}`}
      />
    );
  }
}
