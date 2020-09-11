import { Application } from 'typedoc/dist/lib/application';
import { ParameterType } from 'typedoc/dist/lib/utils/options/declaration';

import { MarkdownPlugin } from './plugin';

export = (PluginHost: Application) => {
  const app = PluginHost.owner;

  if (app.converter.hasComponent('markdown')) {
    return;
  }

  app.options.addDeclaration({
    help:
      '[Markdown Plugin] The filename of the index/entry page (ext not required). Defaults to "README"',
    name: 'entryFileName',
    type: ParameterType.String,
    defaultValue: 'README',
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] Do not print breadcrumbs.',
    name: 'hideBreadcrumbs',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    help: '[Markdown Plugin] DEPRECATED - use --disableSources',
    name: 'hideSources',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.options.addDeclaration({
    help:
      '[Markdown Plugin] Specifies the base path that all links to be served from. If omitted all urls will be relative.',
    name: 'publicPath',
    type: ParameterType.String,
  });

  app.options.addDeclaration({
    help:
      '[Markdown Plugin] Use HTML named anchors as fragment identifiers for engines that do not automatically assign header ids. Should be set for Bitbucket Server docs.',
    name: 'namedAnchors',
    type: ParameterType.Boolean,
    defaultValue: false,
  });

  app.converter.addComponent('markdown', new MarkdownPlugin(app.converter));
};
