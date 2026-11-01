export const medicalFields=[
 {key:"medications",label:"Current medications",hint:"Medicine name, prescribed dose, how often you take it, and why (if known). Include supplements if relevant."},
 {key:"allergyReactions",label:"Allergy reactions and severity",hint:"What triggers the reaction (medicine, food, latex, insect sting, etc.) and what happens. Enter unknown if unsure."},
 {key:"emergencyMedicines",label:"Prescribed emergency medicines",hint:"Any prescribed rescue medicine, such as an inhaler or auto-injector, and where you carry it. Copy your existing care instructions only."},
 {key:"surgeries",label:"Past surgeries or major hospital admissions",hint:"Procedure or reason, approximate date, and any relevant ongoing effects."},
 {key:"devices",label:"Implants, medical devices and accessibility needs",hint:"Examples: pacemaker, insulin pump, hearing aid, mobility support, or communication needs."},
 {key:"otherNotes",label:"Other medical information or existing care instructions",hint:"Anything else you choose to share, such as pregnancy, bleeding disorders, or instructions already given by your clinician."},
] as const;
export type MedicalDetails=Partial<Record<(typeof medicalFields)[number]["key"],string>>;
export function parseMedicalDetails(raw:string|null|undefined):MedicalDetails{try{return JSON.parse(raw||"{}")}catch{return {}}}
