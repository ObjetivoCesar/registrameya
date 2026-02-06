-- 1. Agregar columnas faltantes para VCard 4.0 y Admin Edit
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'registraya_vcard_registros' AND COLUMN_NAME = 'facebook') THEN
        ALTER TABLE registraya_vcard_registros ADD COLUMN facebook TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'registraya_vcard_registros' AND COLUMN_NAME = 'tiktok') THEN
        ALTER TABLE registraya_vcard_registros ADD COLUMN tiktok TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'registraya_vcard_registros' AND COLUMN_NAME = 'productos_servicios') THEN
        ALTER TABLE registraya_vcard_registros ADD COLUMN productos_servicios TEXT;
    END IF;
END $$;

-- 2. Asegurar que las Políticas de RLS permitan la edición pública (para pruebas locales) o admin
-- Nota: En producción, esto debería estar restringido. El usuario pidió aplicar seguridad después.

-- Permitir actualizaciones públicas (necesario si el Admin Panel corre sin Auth de Supabase real)
DROP POLICY IF EXISTS "Permitir actualizaciones públicas" ON registraya_vcard_registros;
CREATE POLICY "Permitir actualizaciones públicas" 
ON registraya_vcard_registros FOR UPDATE 
USING (true) 
WITH CHECK (true);

-- Permitir lectura pública
DROP POLICY IF EXISTS "Permitir lectura pública" ON registraya_vcard_registros;
CREATE POLICY "Permitir lectura pública" 
ON registraya_vcard_registros FOR SELECT 
USING (true);

-- Permitir inserción pública (necesario para el registro)
DROP POLICY IF EXISTS "Permitir inserción pública" ON registraya_vcard_registros;
CREATE POLICY "Permitir inserción pública" 
ON registraya_vcard_registros FOR INSERT 
WITH CHECK (true);
