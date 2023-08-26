"""Dataset Service"""
import app.database.dataset as database


def list_datasets(user_id: int, page: int, limit: int, dataset_type: int = None):
    """列出所有数据集."""
    data, total=database.list_datasets(user_id, page, limit, dataset_type)
    return [vars(dataset) for dataset in data], total


def add_dataset(**kwargs):
    """增加数据集"""
    database.add_dataset(**kwargs)

def update_dataset(**kwargs):
    """修改数据集"""
    database.update_dataset(**kwargs)


def delete_dataset(dataset_id: int, user_id:int):
    """删除数据集"""
    database.delete_dataset(dataset_id, user_id)

def get_dataset(dataset_id:int, user_id:int):
    """获取数据集"""
    dataset = database.get_dataset(dataset_id, user_id)
    return vars(dataset)