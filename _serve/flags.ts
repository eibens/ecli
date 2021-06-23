export function hasHelpFlag(args: string[]) {
  return args.includes("--help") || args.includes("-h");
}
