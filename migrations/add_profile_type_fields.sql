-- Migración: Agregar campos para soportar perfiles de Persona vs Negocio
-- Fecha: 2026-02-17
-- Descripción: Refactorización de campos de nombre para generar vCards correctamente

-- 1. Agregar nuevos campos
ALTER TABLE registraya_vcard_registros
ADD COLUMN IF NOT EXISTS tipo_perfil VARCHAR(10) DEFAULT 'persona' CHECK (tipo_perfil IN ('persona', 'negocio')),
ADD COLUMN IF NOT EXISTS nombres VARCHAR(255),
ADD COLUMN IF NOT EXISTS apellidos VARCHAR(255),
ADD COLUMN IF NOT EXISTS nombre_negocio VARCHAR(255),
ADD COLUMN IF NOT EXISTS contacto_nombre VARCHAR(255),
ADD COLUMN IF NOT EXISTS contacto_apellido VARCHAR(255);

-- 2. Migrar datos existentes (asumimos que todos los registros actuales son personas)
-- Intentamos hacer un split básico del campo 'nombre' existente
UPDATE registraya_vcard_registros
SET 
  tipo_perfil = 'persona',
  nombres = SPLIT_PART(nombre, ' ', 1),
  apellidos = SUBSTRING(nombre FROM POSITION(' ' IN nombre) + 1)
WHERE tipo_perfil IS NULL 
  AND nombre IS NOT NULL 
  AND nombre != '';

-- 3. Crear índice para búsquedas por tipo de perfil
CREATE INDEX IF NOT EXISTS idx_tipo_perfil ON registraya_vcard_registros(tipo_perfil);

-- 4. Comentarios en las columnas para documentación
COMMENT ON COLUMN registraya_vcard_registros.tipo_perfil IS 'Tipo de perfil: persona o negocio';
COMMENT ON COLUMN registraya_vcard_registros.nombres IS 'Nombre(s) de la persona';
COMMENT ON COLUMN registraya_vcard_registros.apellidos IS 'Apellido(s) de la persona';
COMMENT ON COLUMN registraya_vcard_registros.nombre_negocio IS 'Nombre del negocio (para tipo_perfil=negocio)';
COMMENT ON COLUMN registraya_vcard_registros.contacto_nombre IS 'Nombre de la persona de contacto del negocio (opcional)';
COMMENT ON COLUMN registraya_vcard_registros.contacto_apellido IS 'Apellido de la persona de contacto del negocio (opcional)';
