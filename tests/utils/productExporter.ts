import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { Product } from '../pages/ProductListPage';

/**
 * Exports products to JSON and text files in the test results directory.
 * @param products - Array of Product objects to export
 * @param outputDir - Optional custom output directory. Defaults to test-results/product-exports
 * @returns Promise that resolves when both files have been written
 */
export async function exportProducts(
  products: Product[],
  outputDir?: string
): Promise<void> {
  const baseDir = outputDir || join(__dirname, '../../test-results/product-exports');

  // Create output directory if it doesn't exist
  await mkdir(baseDir, { recursive: true });

  // Export as JSON
  const jsonPath = join(baseDir, 'products.json');
  await writeFile(jsonPath, JSON.stringify(products, null, 2));
  console.log(`✓ JSON export saved to: ${jsonPath}`);

  // Export as text file
  const textPath = join(baseDir, 'products.txt');
  const textContent = products
    .map((p, idx) => `${idx + 1}. ${p.name}\n   Price: ${p.price}\n   Link: ${p.href}`)
    .join('\n\n');
  await writeFile(textPath, textContent);
  console.log(`✓ Text export saved to: ${textPath}`);
}
