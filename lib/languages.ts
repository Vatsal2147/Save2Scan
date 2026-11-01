export const languages = [
 ["en-IN","English"],["hi-IN","हिन्दी · Hindi"],["bn-IN","বাংলা · Bengali"],["as-IN","Assamese"],["brx-IN","Bodo"],["doi-IN","Dogri"],["gu-IN","Gujarati"],["kn-IN","Kannada"],["ks-IN","Kashmiri"],["kok-IN","Konkani"],["mai-IN","Maithili"],["ml-IN","Malayalam"],["mni-IN","Manipuri"],["mr-IN","Marathi"],["ne-IN","Nepali"],["od-IN","Odia"],["pa-IN","Punjabi"],["sa-IN","Sanskrit"],["sat-IN","Santali"],["sd-IN","Sindhi"],["ta-IN","Tamil"],["te-IN","Telugu"],["ur-IN","Urdu"],
] as const;
export const spokenLanguages = new Set(["en-IN","hi-IN","bn-IN","gu-IN","kn-IN","ml-IN","mr-IN","od-IN","pa-IN","ta-IN","te-IN"]);
export function validLanguage(code:string){return languages.some(([value])=>value===code)}
