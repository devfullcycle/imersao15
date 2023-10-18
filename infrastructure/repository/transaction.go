package repository

import (
	"fmt"

	"github.com/codeedu/imersao/codepix-go/domain/model"
	"gorm.io/gorm"
)

type TransactionRepositoryDb struct {
	Db *gorm.DB
}

func (t *TransactionRepositoryDb) Register(transaction *model.Transaction) error {
	err := t.Db.Create(transaction).Error
	if err != nil {
		return err
	}
	return nil
}

func (t *TransactionRepositoryDb) Save(transaction *model.Transaction) error {
	err := t.Db.Save(transaction).Error
	if err != nil {
		return err
	}
	return nil
}

func (t *TransactionRepositoryDb) Find(id string) (*model.Transaction, error) {
	var transaction model.Transaction
	//preload permite pegar dados vinculados ao registro, porem que estão em outras tabelas, do contrário tarria apenas o campo usado na referencia
	t.Db.Preload("AccountFrom.Bank").First(&transaction, "id = ?", id)

	if transaction.ID == "" {
		return nil, fmt.Errorf("no transaction was found")
	}
	return &transaction, nil
}
