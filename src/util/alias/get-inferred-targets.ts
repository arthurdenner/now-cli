import { Output } from '../output';
import * as ERRORS from '../../util/errors-ts';
import { Config } from '../../types';

export default async function getInferredTargets(
  output: Output,
  config: Config
) {
  // This field is deprecated, warn about it
  if (config.aliases) {
    output.warn('The `aliases` field has been deprecated in favor of `alias`');
  }

  // The aliases can be stored in both aliases or alias
  const aliases = config.aliases || config.alias;
  if (!aliases) {
    return new ERRORS.NoAliasInConfig();
  }

  // Check the type for the option aliases
  if (typeof aliases !== 'string' && !Array.isArray(aliases)) {
    return new ERRORS.InvalidAliasInConfig(aliases);
  }

  // Always resolve with an array
  return typeof aliases === 'string' ? [aliases] : aliases;
}
