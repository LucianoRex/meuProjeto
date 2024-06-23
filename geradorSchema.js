// Função para transformar formConfig em schemaConfig
function transformToSchemaConfig(formConfig) {
    const schemaConfig = {
        "schemaName": formConfig.schemaName,
        "fields": []
    };

    formConfig.fields.forEach(field => {
        switch (field.type) {
            case 'text':
            case 'email':
            case 'password':
            case 'textarea':
                schemaConfig.fields.push({ "name": field.id, "type": "String" });
                break;
            case 'select':
            case 'radio':
                schemaConfig.fields.push({ "name": field.id, "type": "String" });
                break;
            case 'checkbox':
                schemaConfig.fields.push({ "name": field.id, "type": "Array" });
                break;
            case 'date':
                schemaConfig.fields.push({ "name": field.id, "type": "Date" });
                break;
            case 'ref':
                schemaConfig.fields.push({ "name": field.id, "type": "Mixed" }); // You can adjust this as per your needs
                break;
            default:
                console.warn(`Tipo de campo '${field.type}' não suportado para schema.`);
        }
    });

    // Exemplo de uso:

    return schemaConfig;
}