from pathlib import Path
import anndata as ad

source = Path("data/raw/test.h5ad")
destination = Path("data/processed/test.zarr")

if destination.exists():
    raise FileExistsError(
        f"O destino já existe: {destination}. "
        "Não será substituído."
    )

print("A abrir o dataset...")
adata = ad.read_h5ad(source)

print(f"Células: {adata.n_obs:,}")
print(f"Features: {adata.n_vars:,}")
print(f"UMAP: {adata.obsm['X_umap'].shape}")

print("\nA converter para Zarr...")
adata.write_zarr(destination)

print("\nConversão concluída.")
print(f"Destino: {destination}")
print(f"Tamanho: {destination.stat().st_size if destination.is_file() else 'diretório Zarr'}")
