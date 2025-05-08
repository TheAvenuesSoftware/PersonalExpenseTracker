// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//      robocopy C:\SourceFolder D:\DestinationFolder /E /V /XD C:\SourceFolder\ExcludeFolder1 C:\SourceFolder\ExcludeFolder2
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//      robocopy C:\SourceFolder D:\DestinationFolder /E /COPYALL /V
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>

// If you want to mirror a directory (ensuring the destination matches the source exactly, deleting any extra files in the destination), use
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//      robocopy C:\SourceFolder D:\DestinationFolder /MIR
// <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
// /MIR (Mirror)
// - Synchronizes the destination to match the source exactly.
// - Copies all files and directories (including empty ones).
// - Deletes extra files and directories in the destination that do not exist in the source.
// - Essentially, /MIR is a combination of /E (copy all directories) and /PURGE (remove extra files).
// /PURGE
// - Deletes files and directories in the destination that no longer exist in the source.
// - Unlike /MIR, it does not automatically copy everything—so you'd need /E or another copy option alongside it.
// Example:
// robocopy C:\SourceFolder D:\DestinationFolder /MIR
// This mirrors the directories completely.
// robocopy C:\SourceFolder D:\DestinationFolder /E /PURGE
// This ensures unnecessary files are removed but doesn’t strictly enforce mirroring.
// Would you like help deciding which option fits your task best? 🚀